<template>
  <div class="portfolio">
    <div class="grid">
      <span><strong>Asset</strong></span>
      <span><strong>$Price</strong></span>
      <span><strong>24h%</strong></span>
      <span><strong>7d%</strong></span>
      <span>BTC</span>
      <span>45</span>
      <span>-1%</span>
      <span>0%</span>
      <span>BTS</span>
      <span>7.2</span>
      <span>-1%</span>
      <span>0%</span>
      <span>TRUSTY</span>
      <span>45</span>
      <span>2%</span>
      <span>0%</span>
      <span>ETH</span>
      <span>156</span>
      <span>0%</span>
      <span>1%</span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.portfolio {
  font-family: config("fonts.gotham");
}

.grid {
  background-color: config('colors.table-bg');
  color: config('colors.text-primary');
  padding: config('padding.grid-table');
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.grid > span {
    padding: 8px 4px;
    font-size: config('textSizes.sm');
}

.grid > span > strong {
    font-size: config('textSizes.xs-sm');
}
</style>
