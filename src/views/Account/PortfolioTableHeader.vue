<template>
  <div class="portfolio-table-header">
    <span>Tiker</span>
    <SortableHeaderItem 
      v-for="(header, index) in tableHeaders"
      :key="index"
      :title="header.title" 
      :sort="sort.field === header.field && sort.type || ''"
      @click.native="$emit('toggle-sort', header.field)"
    />
    
  </div>
</template>

<script>
import SortableHeaderItem from '@/components/SortableHeaderItem'

export default {
  components: { SortableHeaderItem },
  props: {
    sort: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      required: true
    }
  },
  computed: {
    tableHeaders() {
      return this.mode === 'balances' ? [
        { title: 'Tokens', field: 'tokens' },
        { title: '$Value', field: 'fiatValue' },
        { title: 'Share', field: 'share' }
      ] : [
        { title: '$Price', field: 'tokenPrice' },
        { title: '24h%', field: 'change1' },
        { title: '7d%', field: 'change7' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.portfolio-table-header {
  background-color: config('colors.table-bg');
  color: config('colors.text-primary');
  padding-bottom: config('padding.2');
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  > span {
    opacity: 0.5;
    font-size: config('textSizes.xs-sm');
  }
}
</style>
