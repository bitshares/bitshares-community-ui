<template>
  <div class="main">
    <Header/>
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

export default {
  name: 'Main',
  components: { Header, Footer }
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
