<template>
  <div class="main">
    <Header/>
    <div class="main__content lg:p-2">
      <router-view/>
    </div>
    <!-- <Footer/> -->
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
    })
  },
  watch: {
    connected: {
      handler(connected) {
        if (!this.userId) return;
        connected ? this.initUserData() : this.unsubFromUserData()
      },
      immediate: true
    },
    userId(newVal) {
      if (!newVal) this.resetUserData()
    }
  },
  methods: {
    ...mapActions({
      initUserData: 'app/initUserData',
      resetUserData: 'app/resetUserData',
      unsubFromUserData: 'app/unsubFromUserData'
    })
  }
}
</script>

<style >
  .main {
    @apply h-full flex flex-col;
  }
  .main__content {
    @apply h-full flex flex-col;
  }
</style>
