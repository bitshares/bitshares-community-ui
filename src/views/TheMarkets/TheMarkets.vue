<template>
  <div class="markets">
    <Tabs
      :tabs="['USD', 'BTC', 'ETH', 'CNY', 'BTS']"
      :currency-mode="true"
    />
  </div>
</template>
<script>
import Tabs from '@/components/Tabs'

export default {
  components: {
    Tabs
  }
}
</script>
