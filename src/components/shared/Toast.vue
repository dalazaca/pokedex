<template>
  <div class="toast-container p-3 top-0 end-0">
    <div
      class="toast align-items-center text-bg-primary border-0"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      id="liveToast"
    >
      <div class="d-flex">
        <div class="toast-body">Hello, world! This is a toast message.</div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';
</style>
