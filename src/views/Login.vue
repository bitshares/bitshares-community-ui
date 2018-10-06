<template>
  <div class="login-container sm:pt-32 sm:items-start">
    <div class="login h-full sm:h-auto">
      <div class="login__title">Login</div>
      <Tabs
        :tabs="['password', 'private key']"
        @change="changeLoginType">
        <div
          slot="password"
          class="login__form">
          
          <VInput
            v-model.trim="name"
            :autofocus="true"
            :error="$v.name.$dirty && $v.name.$invalid"
            title="account name"
            class="mb-2"
            @input="$v.name.$touch"
          >
            <span slot="error" v-if="$v.name.$dirty">
              <span v-show="!$v.name.required">Enter username</span>
            </span>
          </VInput>

          <VInput
            v-model.trim="password"
            :error="$v.password.$dirty && $v.password.$invalid"
            type="password"
            title="password"
            class="mb-2"
            @input="$v.password.$touch"
          >
            <span slot="error" v-if="$v.password.$dirty">
              <span v-show="!$v.password.required">Enter password</span>
            </span>
          </VInput>

        </div>
        <div
          slot="private key"
          class="login__form">
          <VInput
            v-model.trim="brainkey"
            :autofocus="true"
            :error="$v.brainkey.$dirty && $v.brainkey.$invalid"
            class="mb-4"
            tip="Enter 16 words backed up when account was created"
            title="backup phrase"
            @input="$v.brainkey.$touch"
          >
            <span slot="error" v-if="$v.brainkey.$dirty">
              <span v-show="!$v.brainkey.required">Enter backup phrase</span>
            </span>
          </VInput>

          <VInput
            v-model.trim="pin"
            :error="$v.pin.$dirty && $v.pin.$invalid"
            class="mb-4"
            type="password"
            tip="PIN code encrypts the private key, stored on this device"
            title="create pin code"
            @input="$v.pin.$touch"
          >
            <span slot="error" v-if="$v.pin.$dirty">
              <span v-show="!$v.pin.required">Enter PIN</span>
              <span v-show="!$v.pin.minLength">PIN must be 6 characters or more</span>
            </span>
          </VInput>

          <VInput
            v-model.trim="confirmPin"
            :error="$v.confirmPin.$dirty && $v.confirmPin.$invalid"
            type="password"
            title="confirm pin"
            @input="$v.confirmPin.$touch"
          >
            <span slot="error" v-if="$v.confirmPin.$dirty">
              <span v-show="!$v.confirmPin.sameAsPin">PIN codes do not match</span>
            </span>
          </VInput>
        </div>
      </Tabs>
      <div class="login__form">
        <Button
          :disabled="loginDisabled"
          :loading="inProgress"
          class="login__btn"
          width="full"
          text="log in"
          @click="handleLogin"
        />
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
import Tabs from '@/components/Tabs/'
import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: { VInput, Button, Tabs },
  mixins: [validationMixin],
  validations() {
    return this.type === 'password'
      ? {
        name: { required },
        password: { required },
        brainkey: {},
        pin: {},
        confirmPin: {}
      }
      : {
        name: {},
        password: {},
        brainkey: { required },
        pin: { required, minLength: minLength(6) },
        confirmPin: { sameAsPin: sameAs('pin') }
      }
  },
  data() {
    return {
      name: '',
      password: '',
      brainkey: '',
      pin: '',
      confirmPin: '',
      inProgress: false,
      type: 'password'
    }
  },
  computed: {
    loginDisabled() {
      return this.$v.$dirty && this.$v.$invalid
    }
  },
  methods: {
    ...mapActions({
      cloudLogin: 'acc/cloudLogin',
      brainkeyLogin: 'acc/brainkeyLogin'
    }),
    async handleLogin() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.inProgress = true
      if (this.type === 'password') {
        const { error } = await this.cloudLogin({
          name: this.name,
          password: this.password
        })
        if (!error) this.$router.push({ name: 'main' })
      } else {
        const { error } = await this.brainkeyLogin({
          brainkey: this.brainkey.toLowerCase(),
          password: this.pin
        })
        if (!error) this.$router.push({ name: 'main' })
      }
      this.inProgress = false
    },
    changeLoginType(type) {
      this.type = type
    }
  }
}
</script>

<style lang="scss">
  .login-container {
    height: 100%;
    display: flex;
    justify-content: center;
  }
  .login {
    @apply max-w-sm w-full shadow-md;
    border-radius: 2px;
    // flex-shrink: 0;
    background-color: black;
    &__title {
      @apply pt-5 pb-4 text-lg font-gotham-medium;
      color: config('colors.text-primary');
      text-align: center;
      text-transform: uppercase;
    }
    &__form {
      @apply p-card pb-0;
    }
    &__btn {
      @apply mb-2;
    }
    &__footer {
      text-align: center;
      @apply pb-card;
    }
  }
</style>
