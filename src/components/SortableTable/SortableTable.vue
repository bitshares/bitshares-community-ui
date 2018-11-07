<template>
  <div class="sortable-table">

    <div
      :style="headerStyle"
      class="sortable-table__header"
    >
      <SortableHeaderItem
        v-for="(header, index) in headers"
        :key="index"
        :title="header.title"
        :sort="sort.field === header.field && sort.type || ''"
        :align="header.align"
        :padding-left="header.paddingLeft"
        @click.native="toggleSort(header.field)"
      />
    </div>
    <ScrollingContainer :shadower-height="shadowerHeight || 15">
      <div class="sortable-table__body">
        <slot :sorted-items="sortedItems"/>
      </div>
    </ScrollingContainer>
  </div>
</template>

<script>
import SortableHeaderItem from '@/components/SortableHeaderItem'
import ScrollingContainer from '@/components/ScrollingContainer'
import orderBy from 'lodash/orderBy'

export default {
  components: { SortableHeaderItem, ScrollingContainer },
  props: {
    headers: {
      type: Array,
      required: true
    },
    headerLeftPadding: {
      type: Number,
      required: false,
      default: 0
    },
    headerRightPadding: {
      type: Number,
      required: false,
      default: 0
    },
    defaultSort: {
      type: Object,
      required: false,
      default: () => ({
        field: '',
        type: 'desc'
      })
    },
    items: {
      required: true,
      type: Array
    },
    shadowerHeight: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      sort: {
        field: '',
        type: 'desc'
      }
    }
  },
  computed: {
    sortedItems() {
      if (!this.sort.field) return this.items
      return orderBy(this.items, this.sort.field, this.sort.type)
    },
    headerStyle() {
      return {
        'grid-template-columns': `repeat(${this.headers.length}, 1fr)`,
        'padding-left': `${this.headerLeftPadding}rem`,
        'padding-right': `${this.headerRightPadding}rem`
      }
    }
  },
  created() {
    this.sort = this.defaultSort
  },
  methods: {
    toggleSort(field) {
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

<style lang="scss">
  .sortable-table {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .sortable-table__header {
    color: config('colors.text-primary');
    display: grid;
  }
  .sortable-table__body {
    padding-top: config('padding.2');
    height: 100%;
    overflow: auto;
  }
</style>
