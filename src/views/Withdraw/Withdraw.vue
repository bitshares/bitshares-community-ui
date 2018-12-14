<template>
  <div class="withdraw-container h-full sm:w-120">
    <div class="withdraw-title">withdraw</div>
    <div class="withdraw-sub-title">Choose token</div>
  </div>
</template>
<script>
</script>
<style lang="scss">
  .withdraw-container {
    color: config('colors.primary');
    padding: 0.6rem;
    display: flex;
    flex-direction: column;
    height: 100%;

    .withdraw-title {
      font-size: config('textSizes.lg');
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
    .withdraw-sub-title {
      font-size: config('textSizes.lg');
      text-align: center;
    }
  }
</style>
