<template>
  <div class="main">
    <Header/>
    <ConnectionIndicator/>
    <div class="main__content">
      <h3 class="bg-blue text-white">Welcome to bitshares-community-wallet</h3>
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'
import ConnectionIndicator from './ConnectionIndicator.vue'

export default {
  components: { Header, Footer, ConnectionIndicator },
  name: 'Main'
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
