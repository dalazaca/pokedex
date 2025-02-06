<template>
  <div
    class="modal fade"
    :id="`pokeDetailsModal`"
    tabindex="-1"
    aria-labelledby="pokemonModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header position-relative p-0">
          <img
            src="@/assets/images/background.png"
            alt="Modal Background"
            class="w-100 h-100 object-fit-cover"
          />
          <img
            v-if="pokemon?.image"
            :src="pokemon.image"
            alt="Pokemon"
            class="pokemon-image-header position-absolute"
          />
          <img
            src="@/assets/icons/exit.svg"
            alt="Close"
            class="close-icon ms-auto position-absolute top-0 end-0 mt-3 me-3"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <template v-if="pokemon">
            <p class="fw-medium border-bottom">
              <span class="fw-bold">{{
                $t('pokedex.pokemon_details.name')
              }}</span>
              {{ capitalizeFirstLetter(pokemon.name) }}
            </p>
            <p class="fw-medium border-bottom">
              <span class="fw-bold">{{
                $t('pokedex.pokemon_details.weight')
              }}</span>
              {{ pokemon.weight }}
            </p>
            <p class="fw-medium border-bottom">
              <span class="fw-bold">{{
                $t('pokedex.pokemon_details.height')
              }}</span>
              {{ pokemon.height }}
            </p>
            <p class="fw-medium border-bottom">
              <span class="fw-bold">{{
                $t('pokedex.pokemon_details.types')
              }}</span>
              {{ pokemonTypes }}
            </p>
          </template>
        </div>
        <div class="modal-footer border-0 justify-content-between">
          <button class="btn btn-primary" @click="copyToClipboard">
            {{ $t('pokedex.pokemon_details.share_to_friends') }}
          </button>
          <div class="image-wrapper" @click.stop="toogleFavorite">
            <img
              v-if="favorite"
              src="@/assets/icons/favorite-active.svg"
              alt="favorite active"
            />
            <img
              v-else
              src="@/assets/icons/favorite-inactive.svg"
              alt="favorite inactive"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

import { capitalizeFirstLetter } from '@/utils';

import * as bootstrap from 'bootstrap';

const props = defineProps({
  pokemon: {
    type: Object,
    default: null,
  },
  favorite: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['toogleFavorite']);

const pokemonTypes = computed(() => {
  if (!props.pokemon.types || !props.pokemon.types) return '';
  return props.pokemon.types
    .map((typeInfo) => capitalizeFirstLetter(typeInfo.type.name))
    .join(', ');
});

async function copyToClipboard() {
  try {
    const content = `Name: ${capitalizeFirstLetter(props.pokemon.name)}, Weight: ${props.pokemon.weight}, Height: ${props.pokemon.height}, Types: ${pokemonTypes.value}`;
    await navigator.clipboard.writeText(content);

    console.log(content);
    const toastLiveExample = document.getElementById('liveToast');
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);

    var toastBody = document
      .getElementById('liveToast')
      .getElementsByClassName('toast-body');

    toastBody[0].innerHTML = 'Content copied to clipboard!';
    toastBootstrap.show();
  } catch (err) {
    console.error(err);
  }
}

function toogleFavorite() {
  emit('toogleFavorite', props.name);
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';
#pokeDetailsModal {
  .object-fit-cover {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .modal-body {
    margin: 20px 30px 0 30px;
    padding: 0;

    .border-bottom {
      margin-bottom: 10px;
      padding-bottom: 10px;
    }
  }
  .modal-footer {
    margin: 10px 30px 20px 30px;
    padding: 0;
  }

  .image-wrapper {
    position: relative;
    width: 44px;
    height: 44px;
    border-radius: 100px;
    background-color: $gray-100;

    &:hover {
      background-color: $gray-300;
    }

    img {
      position: absolute;
      margin: auto;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
    }
  }

  .close-icon {
    cursor: pointer;
  }

  .modal-header {
    height: 25vh;
  }

  .pokemon-image-header {
    height: 90%;
    left: 50%;
    transform: translate(-50%);
  }
}
</style>
