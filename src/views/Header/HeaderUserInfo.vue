<template>
  <div class="singleline">

    <a
      v-show="userName"
      href="#"
      @click.prevent="handleLogout">logout</a>
    <svgicon name="userIcon"/>
    <p>{{ userName }}</p>
    <svgicon name="arrowDown"/>
  </div>
</template>

<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
import '@icons/userIcon'
import '@icons/arrowDown'

export default {
  name: 'UserInfo',
  computed: {
    ...mapGetters({
      userName: 'user/getUserName'
    })
  },
  methods: {
    ...mapActions({
      logout: 'acc/logout'
    }),
    handleLogout() {
      this.logout()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>
  .singleline {
    @apply .inline-flex
  }
</style>
