<template>
  <div class="main">
    <Header/>
    <ConnectionIndicator/>
    <div class="main__content">
      <h3 class="bg-blue text-white">Welcome to bitshares-community-wallet</h3>
      <Tabs :tabs="['tab1', 'tab2', 'tab3']">
      <div slot="tab1">
        <!-- Stuff. -->1
      </div>

      <div slot="tab2">
        <!-- Stuff. -->2
      </div>

      <div slot="tab3">
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
