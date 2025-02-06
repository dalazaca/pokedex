<template>
  <div class="poke-item d-flex justify-content-between" @click="seeDetails">
    <p>{{ name }}</p>
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
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['toogleFavorite', 'seeDetails']);

function seeDetails() {
  emit('seeDetails', props.name);
}

function toogleFavorite() {
  emit('toogleFavorite', props.name);
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';

.poke-item {
  width: 100%;
  position: relative;
  padding: 8px 10px;
  margin-bottom: 10px;
  border: 1px solid $white;
  background-color: $white;
  border-radius: 5px;
  height: 60px;
  justify-content: center;
  cursor: pointer;

  &:hover {
    border: 1px solid $gray-300;
  }

  p {
    margin-bottom: 0;
    font-weight: $font-weight-medium;
    font-size: $h3-font-size;
    color: $gray-900;
    padding-left: 10px;
    line-height: 40px;
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
}
</style>
