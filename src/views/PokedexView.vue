<template>
  <!-- loading page at first mounted -->
  <loading-page v-if="initialLoading" />

  <!-- input search and pokemon list -->
  <div v-else id="pokemons-list">
    <div class="container">
      <poke-search v-model="pokemonSearch" />
      <div
        v-if="pokemonsFiltered.length > 0"
        class="infinite-scroll-container"
        @scroll="handleScroll"
      >
        <poke-item
          v-for="pokemon in pokemonsFiltered"
          :key="pokemon.name"
          :name="capitalizeFirstLetter(pokemon.name)"
          :favorite="pokedexStore.isFavorite(pokemon.name)"
          @seeDetails="detailPokemon(pokemon.name)"
          @toogleFavorite="pokedexStore.toggleFavorite(pokemon.name)"
        />
        <div v-if="loadingScroll" class="loading">
          <p>{{ $t('pokedex.loader') }}</p>
        </div>
      </div>
      <div v-else class="empty-list text-center">
        <h1>{{ $t('pokedex.empty_list.title') }}</h1>
        <p>{{ $t('pokedex.empty_list.description') }}</p>
        <router-link :to="{ name: 'welcome' }" class="btn btn-primary mt-3">
          {{ $t('pokedex.empty_list.action') }}
        </router-link>
      </div>
      <poke-details-modal
        :pokemon="pokemonSelected"
        :favorite="pokedexStore.isFavorite(pokemonSelected.name)"
        @toogleFavorite="pokedexStore.toggleFavorite(pokemonSelected.name)"
      />
    </div>

    <!--navbar-->
    <nav v-if="pokedexStore.pokemons.length > 0" class="navbar">
      <div class="container px-0 justify-content-around">
        <div class="row w-100">
          <div class="col-6">
            <router-link
              class="btn btn-primary w-100"
              :class="props.onlyFavorites ? '' : 'disabled'"
              :to="{ name: 'list' }"
            >
              <span class="d-flex justify-content-center align-items-center">
                <img src="@/assets/icons/list.svg" :alt="$t('pokedex.all')" />
                {{ $t('pokedex.all') }}
              </span>
            </router-link>
          </div>
          <div class="col-6">
            <router-link
              class="btn btn-primary w-100"
              :class="props.onlyFavorites ? 'disabled' : ''"
              :to="{ name: 'favorites' }"
            >
              <span class="d-flex justify-content-center align-items-center">
                <img
                  src="@/assets/icons/favorite-white.svg"
                  :alt="$t('pokedex.favorites')"
                />
                {{ $t('pokedex.favorites') }}
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import LoadingPage from '@/components/shared/LoadingPage.vue';
import PokeSearch from '@/components/ui/PokeSearch.vue';
import PokeItem from '@/components/ui/PokeItem.vue';
import PokeDetailsModal from '@/components/ui/PokeDetailsModal.vue';

import { onMounted, ref, computed } from 'vue';
import { usePokedexStore } from '@/stores/pokedexStore';
import pokedexService from '@/services/pokedexService';

import * as bootstrap from 'bootstrap';
import { delay, capitalizeFirstLetter } from '@/utils';

// This props is obtained in router.js
const props = defineProps({
  onlyFavorites: Boolean,
});

// First load service
const pokedexStore = usePokedexStore();
const pokemonSearch = ref('');
const initialLoading = computed(() => pokedexStore.initialLoading);
const limit = ref(10);
const offset = ref(0);

// Infinite scroll
const loadingScroll = ref(false);

// Pokemon selected details
const pokemonSelected = ref({
  name: '',
});

onMounted(async () => {
  if (!initialLoading) return;

  try {
    const data = await pokedexService.getPokemonsList(
      limit.value,
      offset.value
    );
    await delay(2000); // Visualize loading page
    pokedexStore.setPokemons(data.results);
  } catch (err) {
    console.error(err);
  } finally {
    pokedexStore.setInitialLoading(false);
  }
});

const handleScroll = async (event) => {
  const container = event.target;
  if (
    container.scrollTop + container.clientHeight >=
      container.scrollHeight - 100 &&
    !loadingScroll.value &&
    !props.onlyFavorites
  ) {
    offset.value += 10;
    loadingScroll.value = true;
    try {
      const data = await pokedexService.getPokemonsList(
        limit.value,
        offset.value
      );
      await delay(1000);
      pokedexStore.setPokemons(data.results);
    } catch (err) {
      console.error(err);
    } finally {
      loadingScroll.value = false;
    }
  }
};

// List depends of onlyFavorites prop and input search value
const pokemonsFiltered = computed(() => {
  const pokemonList = props.onlyFavorites
    ? pokedexStore.favorites
    : pokedexStore.pokemons;

  if (pokemonSearch.value) {
    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(pokemonSearch.value.toLowerCase())
    );
  }
  return pokemonList;
});

const detailPokemon = async (name) => {
  try {
    const details = await pokedexService.getPokemonDetail(name);
    details.image = details.sprites.other['official-artwork'].front_default;
    pokemonSelected.value = details;

    var myModal = bootstrap.Modal.getOrCreateInstance('#pokeDetailsModal');
    myModal.show();
  } catch (err) {
    console.error(err);
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';

#pokemons-list {
  margin-top: 30px;
  margin-bottom: 100px;

  .poke-search {
    margin-bottom: 40px;
  }

  .infinite-scroll-container {
    height: 70vh;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .empty-list {
    h1 {
      margin-bottom: 0;
      font-size: $h1-font-size;
      font-weight: $font-weight-bold;
      color: $gray-900;
      text-align: center;
    }

    p {
      margin-top: 10px;
      margin-bottom: 0;
      text-align: center;
    }
  }

  .navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background-color: $white;
    z-index: 10;
    box-shadow: 0px -5px 4px 0px #0000000d;
  }
}
</style>
