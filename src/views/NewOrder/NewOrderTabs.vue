<template>
  <div class="order-tabs">
    <div v-if="activeTab === 'buy'">buy</div>
    <div v-if="activeTab === 'sell'">sell</div>
  </div>
</template>
<script>
export default {
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
