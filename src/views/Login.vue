<template>
  <div class="login-container">
    <div class="login h-full sm:h-auto">
      <div class="login__title">Login</div>
      <div class="login__form">
        <VInput v-model="name" title="account name"/>
        <VInput v-model="password" title="password"/>
        <Button width="full" text="login" @click="handleLogin"/>  
      </div>
    </div>
  </div>
</template>

<script>
import VInput from '@/components/Input/'
import Button from '@/components/Button/'

export default {
  name: 'Login',
  components: { VInput, Button },
  data() {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      console.log(this.name, this.password)
      // TODO handle login here
    }
  }
}
</script>

<style lang="scss">
  .login-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login {
    @apply max-w-sm w-full;
    flex-shrink: 0;
    background-color: black;
    &__title {
      @apply pt-5 pb-4;
      color: config('colors.text-primary');
      text-align: center;
      text-transform: uppercase;
    }
    &__form {
      @apply p-4;
    }
  }
</style>
