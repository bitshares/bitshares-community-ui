<template>
  <div class="singleline">
    <img  class="user_img" />
    <p>temp</p>
    <img class="arrow_down" />
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
export default {
  name:'UserInfo',
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
    /*background-image: url(@assets/icons/user_icon/);*/
    background-size: contain;
  }
  .arrow_down {
    /*background-image: url(@assets/icons/arrow_down/);*/
    background-size: contain;
  }
  
</style>