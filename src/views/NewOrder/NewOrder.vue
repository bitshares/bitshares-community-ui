<template>
  <div class="new-order">
    <NewOrderTabs
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
  data() {
    return {
      activeTab: {
        title: 'buy'
      }
    }
  },
  computed: {
    ...mapGetters({
      currentBase: 'newOrder/getCurrentBase'
    })
  }
}
</script>
