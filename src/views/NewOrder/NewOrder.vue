<template>
  <div class="new-order">
    <NewOrderTabs
      :tab="activeTab"
      :current-base="currentBase"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
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
  },
  computed: {
    ...mapGetters({
      currentBase: 'newOrder/getCurrentBase'
    })
  }
}
</script>
