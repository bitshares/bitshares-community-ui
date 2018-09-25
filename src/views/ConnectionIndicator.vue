<template>
  <div class="indicator" :class="{'green': connected}"></div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
export default {
  name: 'ConnectionIdicator',
  computed: {
    ...mapGetters({
      connected: 'connection/isReady'
    })
  }
}
</script>

<style scoped>
  .indicator {
    @apply rounded-full h-2 w-2 bg-red;
  }
  .green {
    @apply bg-green;
  }
</style>
