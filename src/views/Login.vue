<template>
  <div class="login-container">
    <div class="login h-full sm:h-auto">
      <div class="login__title">Login</div>
      <!-- tabs will go here to switch between this and brainkey/lockfile login -->
      <div class="login__form">
        <VInput
          v-model="name"
          :autofocus="true"
          title="account name"/>
        <VInput
          v-model="password"
          type="password"
          title="password"/>
        <Button
          :disabled="loginDisabled"
          class="login__btn"
          width="full"
          text="log in"
          @click="handleLogin"/>
      </div>
      <div class="login__footer">
        <router-link :to="{ name: 'login' }">Sign up with new account</router-link>
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
  computed: {
    loginDisabled() {
      return false
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
    border-radius: 2px;
    flex-shrink: 0;
    background-color: black;
    &__title {
      @apply pt-5 pb-4 text-lg;
      color: config('colors.text-primary');
      text-align: center;
      text-transform: uppercase;
    }
    &__form {
      @apply p-card;
    }
    &__btn {
      @apply mt-2;
    }
    &__footer {
      text-align: center;
      @apply pb-card;
    }
  }
</style>
