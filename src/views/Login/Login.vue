<template>
  <div class="login-container sm:pt-32 sm:items-start bg-card-background sm:bg-transparent">
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
            :errors="$v.name"
            input-name="userName"
            class="mb-2"
          />

          <VInput
            v-model.trim="password"
            :errors="$v.password"
            input-name="password"
            type="password"
            class="mb-2"
          />x

        </div>
        <div
          slot="private key"
          class="login__form">
          <VInput
            v-model.trim="brainkey"
            :errors="$v.brainkey"
            input-name="brainkey"
            class="mb-6"
          />

          <KeyfileLoader
            v-if="!brainkey"
            @select="selectFile"
            @remove="removeFile"
          />

          <template v-if="validateBrainkey">
            <VInput
              v-model.trim="pin"
              :errors="$v.pin"
              :password="true"
              input-name="pin"
              class="mb-4 mt-2"
            />
            <VInput
              v-model.trim="confirmPin"
              :errors="$v.confirmPin"
              :password="true"
              input-name="confirmPin"
            />
          </template>
          <template v-if="file">
            <VInput
              v-model.trim="pin"
              :errors="$v.pin"
              type="password"
              input-name="password"
              class="mb-4 mt-2"
            />
          </template>
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
        <div class="footer-link">
          <router-link :to="{ name: 'signup' }">Sign up with new account</router-link>
        </div>
        <div class="footer-link">
          <router-link :to="{ name: 'login' }">I accept Terms of Use</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VInput from '@/components/Input/'
import Button from '@/components/Button/'
import Tabs from '@/components/Tabs/'
import KeyfileLoader from './KeyfileLoader'
import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: { VInput, Button, Tabs, KeyfileLoader },
  mixins: [validationMixin],
  validations() {
    if (this.type === 'password') {
      return {
        name: { required },
        password: { required },
        brainkey: {},
        pin: {},
        confirmPin: {}
      }
    } else {
      if (this.file) {
        return {
          name: {},
          password: {},
          brainkey: {},
          pin: { required, minLength: minLength(6) },
          confirmPin: {}
        }
      } else {
        return {
          name: {},
          password: {},
          brainkey: {
            required: (value) => {
              if (this.file) return true
              return required(value)
            }
          },
          pin: { required, minLength: minLength(6) },
          confirmPin: { sameAsPin: sameAs('pin') }
        }
      }
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
      type: 'password',
      file: null
    }
  },
  computed: {
    loginDisabled() {
      return this.$v.$dirty && this.$v.$invalid
    },
    validateBrainkey() {
      if (this.brainkey.split(' ').length - 1 === 15) {
        return true
      }
    }
  },
  methods: {
    ...mapActions({
      cloudLogin: 'acc/cloudLogin',
      brainkeyLogin: 'acc/brainkeyLogin',
      fileLogin: 'acc/fileLogin'
    }),
    async handleLogin() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.inProgress = true
      if (this.type === 'password') {
        const { error } = await this.cloudLogin({
          name: this.name.toLowerCase(),
          password: this.password
        })
        if (error) this.$toast.error('Invalid username or password')
        else this.$router.push({ name: 'main' })
      } else {
        if (this.file) {
          this.handleLoginFile()
          return
        }
        const { error } = await this.brainkeyLogin({
          brainkey: this.brainkey.toLowerCase(),
          password: this.pin
        })
        if (error) this.$toast.error('Invalid brainkey')
        else this.$router.push({ name: 'main' })
      }
      this.inProgress = false
    },
    async handleLoginFile() {
      const { success, error } = await this.fileLogin({
        password: this.pin,
        backup: this.file
      })
      console.log('Result', success, error, this.pin)
      this.inProgress = false
      if (success) this.$router.push({ name: 'main' })
      else this.$toast.error(error)
    },
    changeLoginType(type) {
      this.type = type
      this.file = ''
      this.$nextTick(() => { this.$v.$reset() })
    },
    selectFile(file) {
      this.file = file
    },
    removeFile() {
      this.file = null
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
      .footer-link {
        @apply pt-1;
      }
    }
  }
</style>
