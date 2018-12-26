<template>
  <div class="orders-container">
    <Tabs
      :tabs="tabs"
      :active="activeTab"
      @change="changeTab"
    />
  </div>
</template>
<script>
import Card from '@/components/Card'
import Tabs from '@/components/Tabs'

export default {
  components: {
    Card,
    Tabs
  },
  data() {
    return {
      tabs: ['ACTIVE', 'HISTORY']
    }
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab
    }
  }
}
</script>
<style lang="scss">
</style>
