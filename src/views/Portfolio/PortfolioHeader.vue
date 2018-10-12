<template>
  <div class="portfolio">
    <div class="textWeak">Balance</div>&nbsp; 6754 USD
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.portfolio {
  font-family: config("fonts.gotham");
  font-size: config('textSizes.sm');
  display: flex;
  color: config('colors.text-primary');
}

.textWeak {
    opacity: 0.5;
    font-size: config('textSizes.xs-sm');
    line-height: normal;
}
</style>
