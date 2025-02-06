<template>
  <div class="poke-search input-group">
    <span class="input-group-text">
      <img src="@/assets/icons/search.svg" alt="search pokemon" />
    </span>
    <input
      type="text"
      class="form-control"
      placeholder="Search"
      aria-label="Search"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';

.poke-search {
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.04);
  border-radius: 5px;
  background-color: $white;

  &:hover {
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  }

  .input-group-text {
    padding: 15px 0 16px 16px;
    border: none;
    background-color: $white;
  }

  .form-control {
    border: none;
    background-color: $white;
    padding: 14px 10px;
    font-size: $font-size-sm;
    color: $gray-900;

    &:focus {
      border: none;
      box-shadow: none;
    }

    &:placeholder {
      color: $gray-500;
    }
  }
}
</style>
