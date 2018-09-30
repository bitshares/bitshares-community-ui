<template>
  <div>
    <img  class="" />
    <p></p>
    <img/>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
export default {
  name:'Userinfo',
  computed: {
    ...mapGetters({
      userName: 'user/getUserName'
    }),
    // stub till without auth
    getName() {
      if (!this.userName) return 'default'
      return this.userName
    }
  }
}
</script>

<style scoped>
  .singleline {
    @apply .inline-block
  }
  .user_img {
    background-image: url(@assets/svg/user_icon.svg);
    background-size: contain;

  }
  
</style>