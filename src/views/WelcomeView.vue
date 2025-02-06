<template>
  <div id="welcome" class="container d-flex flex-column align-items-center">
    <img src="@/assets/images/pikachu.png" :alt="$t('welcome.alt_image')" />
    <h1>{{ $t('welcome.title') }}</h1>
    <p>{{ $t('welcome.description') }}</p>
    <router-link class="btn btn-primary" :to="{ name: 'list' }">{{
      $t('welcome.action')
    }}</router-link>
  </div>
</template>

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
