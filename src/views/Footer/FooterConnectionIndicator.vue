<template>
  <div
    :class="{'green': connected}"
    class="indicator"/>
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
