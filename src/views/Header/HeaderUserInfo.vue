<template>
  <div class="user-info">
    <!-- <svgicon name="userIcon"/> -->
    <div
      class="backup-btn"
      @click="setBackupFlag(true)"
    >Backup</div>

    <svgicon
      v-show="userName"
      class="mr-3 cursor-pointer"
      name="logout"
      @click.native="handleLogout"
    />
    <p class="uppercase text-lg">{{ userName }}</p>
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
      userName: 'acc/getCurrentUserName'
    })
  },
  methods: {
    ...mapActions({
      logout: 'acc/logout',
      setBackupFlag: 'backup/setBackupFlag'
    }),
    handleLogout() {
      this.$router.push({ name: 'login' })
      this.logout()
    }
  }
}
</script>

<style lang="scss" scoped>
.backup-btn {
  color: white;
  margin-right: 2rem;
  cursor: pointer;
  &:hover {
    border-bottom: 1px solid white;
  }
}
.user-info {
  @apply inline-flex text-white;
}
</style>
