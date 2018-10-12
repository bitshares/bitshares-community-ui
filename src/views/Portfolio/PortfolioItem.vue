<template>
  <div>
    <div
      v-for="(item, index) in items"
      :key="index"
      class="grid-items"
    >
      <span>{{ item.name }}</span>
      <span>{{ item.token }}</span>
      <span>{{ item.fiatValue }}</span>
      <span>{{ item.percent }}</span>
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

.grid-items div {
  background-color: config('colors.table-bg');
  color: config('colors.text-primary');
  padding: config('padding.grid-table');
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  line-height: 5px;
}

.grid-items span {
    padding: 8px 15px;
    font-size: config('textSizes.sm');
}

@media screen and (max-width: 990px) {
  .grid-items span {
    padding: 8px 65px;
  }
}

@media screen and (max-width: 768px) {
  .grid-items span {
    padding: 8px 45px;
  }
}

@media screen and (max-width: 480px) {
  .grid-items span {
    padding: 8px 30px;
  }
}

@media screen and (max-width: 390px) {
  .grid-items span {
    padding: 8px 20px;
  }
}

@media screen and (max-width: 280px) {
  .grid-items span {
    padding: 8px 10px;
  }
}

</style>
