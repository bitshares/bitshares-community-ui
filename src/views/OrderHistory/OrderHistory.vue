<template>
  <div class="order-histroy">OrderHistory</div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OrderHistory',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      historyItems: 'orderHistory/getHistory'
    })
  }
}
</script>
