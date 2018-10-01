<template>
  <div class="singleline">
    <svgicon name="userIcon"/>
    <p>{{ userName || 'default' }}</p>
    <svgicon name="arrowDown"/>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
import '@icons/userIcon'
import '@icons/arrowDown'

export default {
  name: 'UserInfo',
  computed: {
    ...mapGetters({
      userName: 'user/getUserName'
    })
  }
}
</script>

<style scoped>
  .singleline {
    @apply .inline-flex
  }
</style>
