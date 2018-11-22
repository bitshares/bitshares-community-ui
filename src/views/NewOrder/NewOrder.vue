<template>
  <div class="new-order">
    <NewOrderTabs
      :tab="activeTab"
    />
  </div>
</template>
<script>
import NewOrderTabs from './NewOrderTabs'

export default {
  components: {
    NewOrderTabs
  },
  props: {
    activeTab: {
      type: String,
      default: 'buy'
    }
  },
  data() {
    return {}
  }
}
</script>
