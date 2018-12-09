<template>
  <div class="unlock-wallet">
    <div v-if="isLocked">
      <Input
        v-model="password"
        :password="true"
        type="number"
        title="password"
      />
      <Button 
        width="full"
        text="unlock wallet"
        @click="unlock"
      />
    </div>
    <slot v-else/>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Input from '@/components/SimpleInput'
import Button from '@/components/Button'

export default {
  components: {
    Button, Input
  },
  data() {
    return {
      password: ''
    }
  },
  computed: {
    ...mapGetters({
      isLocked: 'acc/isLocked',
      isValidPassword: 'acc/isValidPassword'
    })
  },
  methods: {
    ...mapActions('acc', ['unlockWallet']),

    unlock() {
      if (this.isValidPassword(this.password + '')) {
        this.unlockWallet(this.password + '')
      } else {
        this.$toast.error('Invalid password')
      }
    }
  
  }
}
</script>
<style lang="scss">
  
</style>
