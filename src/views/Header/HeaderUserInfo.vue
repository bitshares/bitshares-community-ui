<template>
  <div class="user-info">
    <p class="uppercase text-lg">{{ userName }}</p>
    <svgicon
      name="arrowDown"
      height="10"
      width="10"
      class="icon"
    />
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
  text-align: right;
  @apply inline-flex text-white;

  p {
    color: config('colors.grey');
    width: 100%;
    padding-right: 10px;
  }

  svg {
    fill: config('colors.grey');
    transform: rotate(270deg);
    display: block;
    margin: auto;
    margin-top: 3px;
  }
}
</style>
