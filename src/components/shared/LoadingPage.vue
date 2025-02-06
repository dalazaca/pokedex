<template>
  <div class="loading-page vh-100 w-100">
    <img
      class="pokeball"
      src="@/assets/images/pokeball.png"
      :alt="$t('loading.alt_image')"
    />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.loading-page {
  position: relative;

  .pokeball {
    position: absolute;
    margin: auto;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    animation: spin 0.5s linear infinite;
  }

  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
}
</style>
