<template>
  <div class="singleline">
    <svgicon name="userIcon"/>
    <p>{{ getName }}</p>
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
    }),
    getName() {
      if (!this.userName) return 'default'
      return this.userName
    }
  }
}
</script>

<style scoped>
  .singleline {
    @apply .inline-flex
  }
</style>
