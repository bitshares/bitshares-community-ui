<template>
  <div>
    <div v-bind:class="[getStatus ? activeClass : errorClass]"></div>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      activeClass: 'indicator green',
      errorClass: 'indicator red'
    }
  },
  name: 'ConnectionIdicator',
  computed: {
    ...mapGetters({
      isReady: 'connection/isReady'
    }),
    getStatus () {
      return this.isReady
    }
  }
}
</script>

<style >
  .indicator {
    @apply rounded-full h-2 w-2;
  }
  .green {
    @apply bg-green;
  }
  .red {
    @apply bg-red;
  }
</style>
