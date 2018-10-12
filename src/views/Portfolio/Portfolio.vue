<template>
  <div class="portfolio">
    <div class="grid">
      <span><strong>Asset</strong></span>
      <span><strong>$Price</strong></span>
      <span><strong>24h%</strong></span>
      <span><strong>7d%</strong></span>
    </div>
    <div class="grid-items">
      <div
        v-for="(item, index) in items"
        :key="index">
        <span>{{ item.name }}</span>
        <span>{{ item.token }}</span>
        <span>{{ item.fiatValue }}</span>
        <span>{{ item.percent }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [{
        name: 'BTC',
        token: 0.345,
        fiatValue: 2345,
        percent: 12
      },
      {
        name: 'ETH',
        token: 0.345,
        fiatValue: 2345,
        percent: 12
      },
      {
        name: 'LTC',
        token: 0.345,
        fiatValue: 2345,
        percent: 12
      },
      {
        name: 'BTS',
        token: 0.345,
        fiatValue: 2345,
        percent: 12 },
      {
        name: 'USD',
        token: 0.345,
        fiatValue: 2345,
        percent: 12 },
      {
        name: 'XRP',
        token: 0.345,
        fiatValue: 2345,
        percent: 12 },
      {
        name: 'EOS',
        token: 0.345,
        fiatValue: 2345,
        percent: 12 }]
    }
  }
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

.grid-items div {
  background-color: config('colors.table-bg');
  color: config('colors.text-primary');
  padding: config('padding.grid-table');
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  line-height: 5px;
}

.grid > span {
    padding: 8px 4px;
    font-size: config('textSizes.sm');
}

.grid span strong {
    font-size: config('textSizes.xs-sm');
}
</style>
