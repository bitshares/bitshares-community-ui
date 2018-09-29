<template>
  <div class="login-container">
    <div class="login h-full sm:h-auto">
      <div class="login__title">Login</div>
      <!-- tabs will go here to switch between this and brainkey/lockfile login -->
      <div class="login__form">
        <VInput
          v-model="name"
          :autofocus="true"
          :error="nameErrorMsg"
          title="account name"
          @input="$v.name.$touch()"
        />
        <VInput
          v-model="password"
          :error="passwordErrorMsg"
          type="password"
          title="password"
          @input="$v.password.$touch()"
        />
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
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: { VInput, Button },
  mixins: [validationMixin],
  validations: {
    name: { required },
    password: { required }
  },
  data() {
    return {
      name: '',
      password: '',
      inProgress: false
    }
  },
  computed: {
    nameErrorMsg() {
      return (!this.$v.name.required && this.$v.name.$dirty) ? 'Enter username' : ''
    },
    passwordErrorMsg() {
      return (!this.$v.password.required && this.$v.password.$dirty) ? 'Enter password' : ''
    },
    loginDisabled() {
      return this.inProgress
    }
  },
  methods: {
    ...mapActions({
      login: 'account/loginWithPassword'
    }),
    async handleLogin() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.inProgress = true
        const resp = await this.login({
          name: this.name,
          password: this.password
        })
        this.inProgress = false
        console.log(resp)
      }
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
