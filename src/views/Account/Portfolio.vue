<template>
  <LoadingContainer :loading="!items.length">
    <div class="portfolio-header">
      <LinkButton title="hide small assets"/>
      <LinkButton
        :title="`show ${mode}`"
        @click.native="toggleMode"/>
    </div>
    <div class="portfolio">
      <PortfolioTableHeader :mode="mode"/>
      <div
        v-for="(item, index) in sortedItems"
        :key="index"
        class="grid-items"
      >
        <PortfolioItem
          :mode="mode"
          :item="item" />
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
      items: 'portfolio/getItems'
    }),
    sortedItems() {
      return orderBy(this.items, this.sort.field, this.sort.type)
    }
  },
  methods: {
    toggleMode() {
      this.mode = this.mode === 'balances' ? 'prices' : 'balances'
    }
  }
}
</script>

<style scoped lang="scss">
.portfolio {
  font-family: config("fonts.gotham");
}

.portfolio-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
</style>
