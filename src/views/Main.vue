<template>
  <div class="main">
    <Header/>
    <ConnectionIndicator/>
    <div class="main__content">
      <h3 class="bg-blue text-white">Welcome to bitshares-community-wallet</h3>
      <Tabs :tabs="['Tab example #1 with the responsive width', 'Tab example #2 with the responsive width', 'Tab example #3 with the responsive width']">
      <div slot="Tab example #1 with the responsive width">
        <!-- Stuff. -->1
      </div>

      <div slot="Tab example #2 with the responsive width">
        <!-- Stuff. -->2
      </div>

      <div slot="Tab example #3 with the responsive width">
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
