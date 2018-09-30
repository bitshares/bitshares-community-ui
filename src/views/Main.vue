<template>
  <div class="main">
    <Header/>
    <div class="main__content">
      <h3 class="bg-blue text-white" v-show="userName">
        <b>{{ userName }}</b>, welcome to bitshares-community-wallet
      </h3>
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Main',
  components: { Header, Footer },
  computed: {
    ...mapGetters ({
      connected: 'connection/isReady',
      userId: 'acc/getAccountUserId',
      userName: 'user/getUserName'
    })
  },
  methods: {
    ...mapActions({
      loadUserData: 'user/fetchUser'
    })
  },
  watch: {
    connected: {
      handler(newVal) {
        if (newVal) this.loadUserData(this.userId)
      },
      immediate: true
    }
  }
}
</script>

<style >
  .main {
    @apply h-full flex flex-col;
  }
  .main__content {
    @apply h-full flex flex-col p-2;
    border: 1px solid black;
  }
</style>
