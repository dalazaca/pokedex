<template>
  <div id="welcome" class="d-flex flex-column align-items-center">
    <img src="@/assets/images/pikachu.png" :alt="$t('welcome.alt_image')" />
    <h1>{{ $t('welcome.title') }}</h1>
    <p>{{ $t('welcome.description') }}</p>
    <RouterLink class="btn btn-primary" :to="{ name: 'list' }">{{
      $t('welcome.action')
    }}</RouterLink>
    <br class="pt-5" />
    <poke-item
      name="Charmander"
      :favorite="false"
      @seeDetails="prueba1"
      @toogleFavorite="prueba2"
    />
    <br class="pt-5" />
    <poke-search />
    <br class="pt-5" />
  </div>
</template>

<script setup>
import PokeItem from '@/components/ui/PokeItem.vue';
import PokeSearch from '@/components/ui/PokeSearch.vue';

function prueba1(name) {
  console.log('Datos recibidos:', name);
}

function prueba2(name) {
  console.log('Datos recibidos 2:', name);
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';

#welcome {
  margin-top: 70px;

  img {
    max-width: 325px;
    width: 100%;
    object-fit: cover;
  }

  h1 {
    margin-top: 50px;
    margin-bottom: 0;
    font-size: $h2-font-size;
    font-weight: $font-weight-bold;
    color: $gray-900;
    text-align: center;
  }

  p {
    margin-top: 30px;
    margin-bottom: 0;
    text-align: center;
  }

  .btn {
    margin-top: 50px;
  }
}
</style>
