<template>
  <LoadingContainer
    :loading="!historyLoaded"
    class="portfolio-container">
    <div class="portfolio-header">
      <!-- <LinkButton title="hide small assets"/> -->
      <LinkButton
        :title="`show ${inactiveMode}`"
        @click.native="toggleMode"/>
    </div>
    <div class="portfolio-table">
      <PortfolioTableHeader
        :sort="sort"
        :mode="mode"
        @toggle-sort="changeSort"/>
      <div
        v-for="(item, index) in sortedItems"
        :key="index"
        class="grid-items"
      >
        <PortfolioItem
          :mode="mode"
          :item="item"
        />
      </div>
    </div>
  </LoadingContainer>

</template>

<script>
import { mapGetters } from 'vuex'
import LoadingContainer from '@/components/LoadingContainer'
import LinkButton from '@/components/LinkButton'
import PortfolioTableHeader from './PortfolioTableHeader.vue'
import PortfolioItem from './PortfolioItem.vue'
import orderBy from 'lodash/orderBy'

export default {
  components: { PortfolioItem, LoadingContainer, LinkButton, PortfolioTableHeader },
  data() {
    return {
      sort: {
        field: 'fiatValue',
        type: 'desc'
      },
      mode: 'balances'
    }
  },
  computed: {
    ...mapGetters({
      items: 'portfolio/getItems',
      historyLoaded: 'history/initialLoaded'
    }),
    sortedItems() {
      return orderBy(this.items, this.sort.field, this.sort.type)
    },
    inactiveMode() {
      return this.mode === 'balances' ? 'prices' : 'balances'
    }
  },
  methods: {
    toggleMode() {
      this.mode = this.inactiveMode
    },
    changeSort(field) {
      if (this.sort.field === field) {
        this.sort.type = this.sort.type === 'asc' ? 'desc' : 'asc'
        return
      }
      this.sort.field = field
      this.sort.type = 'desc'
    }
  }
}
</script>

<style scoped lang="scss">
.portfolio-container {
  padding-right: 0.3rem;
}

.portfolio-table {
  font-family: config("fonts.gotham");
}

.portfolio-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}
</style>
