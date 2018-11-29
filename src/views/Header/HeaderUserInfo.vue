<template>
  <div class="user-info">
    <p class="uppercase text-lg">{{ userName }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserInfo',
  computed: {
    ...mapGetters({
      userName: 'acc/getCurrentUserName'
    })
  },
  methods: {
    handleLogout() {
      this.$router.push({ name: 'login' })
      this.logout()
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  margin-left: auto;
  @apply inline-flex text-white;
  margin-right: 1rem;
}
</style>
