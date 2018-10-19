<template>
  <LoadingContainer :loading="!items.length">
    <div class="portfolio">
      <div class="grid-header">
        <span>Tiker</span>
        <span>Tokens</span>
        <span>$Value</span>
        <span>Share</span>
      </div>
      <div
        v-for="(item, index) in sortedItems"
        :key="index"
        class="grid-items"
      >
        <PortfolioItem :item="item" />
      </div>
    </div>
  </LoadingContainer>

</template>

<script>
import { mapGetters } from 'vuex'
import LoadingContainer from '@/components/LoadingContainer'
import PortfolioItem from './PortfolioItem.vue'
import orderBy from 'lodash/orderBy'

export default {
  components: { PortfolioItem, LoadingContainer },
  data() {
    return {
      sort: {
        field: 'fiatValue',
        type: 'desc'
      }
    }
  },
  computed: {
    ...mapGetters({
      items: 'portfolio/getItems'
    }),
    sortedItems() {
      return orderBy(this.items, this.sort.field, this.sort.type)
    }
  }
}
</script>

<style scoped lang="scss">
.portfolio {
  font-family: config("fonts.gotham");
}

.portfolio-options {
  font-family: config("fonts.gotham");
  color: config('colors.text-primary');
  display: flex;
  justify-content: space-between;
}

.options-header {
  padding: 0;
  text-transform: uppercase;
  &--centered {
    justify-content: center;
  }
}

.options-header .option {
  @apply font-gotham text-base py-3;
  @apply cursor-pointer;
  color: config('colors.tab-header');
  font-size: config('textSizes.xxs-xs');
  text-align: center;
  line-height: 0px;
  &--active {
    @apply cursor-default;
    color: config('colors.tab-active')!important;
    border-bottom: 2px solid config('colors.tab-header');
    border-bottom-color: config('colors.tab-active')!important;
  }
  &:hover {
    color:config('colors.tab-hover');
      border-bottom: 2px solid config('colors.tab-header');
    border-bottom-color: config('colors.tab-hover');
  }
}

.grid-header {
  background-color: config('colors.table-bg');
  color: config('colors.text-primary');
  padding-bottom: config('padding.2');
  opacity: 0.5;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.grid-header span {
    padding: 0px 0px;
    font-size: config('textSizes.xs-sm');
    &:not(:first-child) {
      text-align: right;
    }
}

</style>
