<template>
  <div class="portfolio-header">
    <div class="text-weak">Balance</div>&nbsp; 6754 USD
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.portfolio-header {
  font-family: config("fonts.gotham");
  font-size: config('textSizes.sm');
  display: flex;
  color: config('colors.text-primary');
}

.text-weak {
    opacity: 0.5;
    font-size: config('textSizes.xs-sm');
    line-height: normal;
}
</style>
