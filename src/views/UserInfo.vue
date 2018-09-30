<template>
  <div class="singleline">
    <svgicon name="userIcon"> </svgicon>
    <p>{{getName}}</p>
    <svgicon name="arrowDown"> </svgicon>
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
    // stub till without auth
    getName () {
      console.log(this.userName)
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
