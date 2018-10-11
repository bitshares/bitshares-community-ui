<template>
  <div class="portfolio">
    <div class="dashboard">
    dashboard!
    <div class="grid">
      <span><strong>Ticker</strong></span>
      <span><strong>$Price</strong></span>
      <span><strong>24h%</strong></span>
      <span><strong>7d%</strong></span>
      <span>0</span>
      <span>Aaron Kris</span>
      <span>Philippines</span>
      <span>1991-05-23T14:19:51</span>
      <span>Ophelia_Mitchell@karley.name</span>
      <span>1</span>
      <span>Simeon McLaughlin</span>
      <span>Singapore</span>
      <span>2012-03-07T00:08:36</span>
      <span>Sabrina_Barton@torey.net</span>
      <span>2</span>
      <span>Kelsie Shanahan</span>
      <span>Brazil</span>
      <span>1985-03-10T20:13:04</span>
      <span>Karianne@salvatore.biz</span>
    </div>
  </div>
  </div>
</template>

<script>
export default {

}
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
}
</style>
