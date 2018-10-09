<template>
  <div class="main">
    <Header/>
    <div class="main__content">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/views/Footer/Footer.vue'
import Header from '@/views/Header/Header.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Main',
  components: { Header, Footer },
  computed: {
    ...mapGetters({
      connected: 'connection/isReady',
      userId: 'acc/getAccountUserId',
      userName: 'user/getUserName'
    })
  },
  watch: {
    connected: {
      handler(newVal) {
        if (newVal) this.loadUserData(this.userId)
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      loadUserData: 'user/fetchUser'
    })
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
