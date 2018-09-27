<template>
  <div class="main">
    <Header/>
    <ConnectionIndicator/>
    <div class="main__content">
      <h3 class="bg-blue text-white">Welcome to bitshares-community-wallet</h3>
      <Tabs :tabs="['as a link', 'as a form', 'as an iFrame']">
      <div slot="as a link">
        <!-- Stuff. -->1
      </div>

      <div slot="as a form">
        <!-- Stuff. -->2
      </div>

      <div slot="as an iFrame">
        <!-- Stuff.-->3
      </div>
      </Tabs>
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'
import ConnectionIndicator from './ConnectionIndicator.vue'
import Tabs from '../components/Tabs'

export default {
  components: { Header, Footer, ConnectionIndicator, Tabs },
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
