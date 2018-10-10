<template>
  <div class="user-info">
    <!-- <svgicon name="userIcon"/> -->
    <svgicon
      v-show="userName"
      class="mr-3 cursor-pointer"
      name="logout"
      @click.native="handleLogout"
    />
    <p class="uppercase">{{ userName }}</p>
    <!-- <svgicon name="arrowDown"/> -->
  </div>
</template>

<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
import '@icons/userIcon'
import '@icons/arrowDown'
import '@icons/logout'

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
  .user-info {
    @apply inline-flex text-white;

  }
</style>
