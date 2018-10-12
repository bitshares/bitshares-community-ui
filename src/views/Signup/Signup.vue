<template>
  <div class="signup-container sm:pt-32 sm:items-start">
    <div class="signup h-full sm:h-auto">
      <div class="signup__title">Signup</div>
      <Tabs
        :tabs="['password', 'private key']"
        @change="changeSignupType">

        <div
          slot="password"
          class="signup__form">

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
            icon="copy"
            class="mb-2"
            @icon-click="copyPassword"
          />

          <VInput
            v-model.trim="confirmPassword"
            :errors="$v.confirmPassword"
            :icon="!!passToCopy ? 'paste' : null"
            input-name="confirmPassword"
            class="mb-2"
            @icon-click="pastePassword"
          />

        </div>
        <div
          slot="private key"
          class="signup__form">
          <VInput
            v-model.trim="name"
            :errors="$v.name"
            input-name="userName"
            class="mb-4"
          />

          <VInput
            v-model.trim="pin"
            :errors="$v.pin"
            input-name="pin"
            class="mb-4"
            type="number"
          />

          <VInput
            v-model.trim="confirmPin"
            :errors="$v.confirmPin"
            input-name="confirmPin"
            type="number"
          />
        </div>
      </Tabs>

      <div class="signup__form">
        <Button
          :disabled="signupDisabled"
          :loading="inProgress"
          class="signup__btn"
          width="full"
          text="sign up"
          @click="handleSignup"
        />
      </div>

      <div class="signup__footer">
        <div class="footer-link">
          <router-link :to="{ name: 'login' }">Log in with existing account</router-link>
        </div>
        <div class="footer-link">
          <router-link :to="{ name: 'signup' }">I accept Terms of Use</router-link>
        </div>
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
import { utils, getUser } from 'vuex-bitshares/src/services/api/account.js'
import dictionary from 'vuex-bitshares/test/brainkey_dictionary.js'
import '@icons/copy'
import '@icons/paste'

const isUnique = (name) => {
  if (name === '') return true
  return new Promise(async(resolve, reject) => {
    const resp = await getUser(name)
    resolve(!resp.success)
  })
}

export default {
  name: 'Signup',
  components: { VInput, Button, Tabs },
  mixins: [validationMixin],
  validations() {
    let validations = {
      name: {
        required,
        isUnique,
        minLength: minLength(4),
        hasSpecialSymbol(value) {
          const hasDog = value.indexOf('@') > -1
          const hasLine = value.indexOf('-') > -1
          const hasNumber = /\d/.test(value)
          return hasDog || hasLine || hasNumber
        },
        noBadSymbolAtEnd(value) {
          if (value.indexOf('@') === value.length - 1) return false
          if (value.indexOf('-') === value.length - 1) return false
          if (value.indexOf('.') === value.length - 1) return false
          return true
        }
      }
    }
    if (this.type === 'password') {
      validations = {
        ...validations,
        password: { required },
        confirmPassword: { sameAsPassword: sameAs('password') },
        pin: {},
        confirmPin: {} }
    } else {
      validations = {
        ...validations,
        name: { required, isUnique, minLength: minLength(4) },
        password: {},
        confirmPassword: {},
        pin: { required, minLength: minLength(6) },
        confirmPin: { sameAsPin: sameAs('pin') }
      }
    }
    return validations
  },
  data() {
    return {
      name: '',
      password: '',
      confirmPassword: '',
      passToCopy: '',
      pin: '',
      confirmPin: '',
      inProgress: false,
      type: 'password'
    }
  },
  computed: {
    signupDisabled() {
      return this.$v.$dirty && this.$v.$invalid
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.password = utils.suggestPassword()
    })
  },
  methods: {
    ...mapActions({
      signupWithPassword: 'acc/signupWithPassword',
      signupBrainkey: 'acc/signupBrainkey'
    }),
    handleSignup() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      if (this.type === 'password') {
        this.handleSignupPassword()
      } else {
        this.handleSignupBrainkey()
      }
    },
    async handleSignupPassword() {
      this.inProgress = true
      const resp = await this.signupWithPassword({
        name: this.name,
        password: this.password
      })
      this.inProgress = false

      if (resp.error) this.$toast.error(resp.message)
      else this.$router.push({ name: 'main' })
    },
    async handleSignupBrainkey() {
      this.inProgress = true
      const resp = await this.signupBrainkey({
        name: this.name,
        password: this.pin,
        dictionary: dictionary.en,
        email: ''
      })
      this.inProgress = false
      if (resp.error) this.$toast.error(resp.message)
      else this.$router.push({ name: 'main' })
    },
    changeSignupType(type) {
      this.type = type
      this.$nextTick(() => { this.$v.$reset() })
    },
    copyPassword() {
      this.$copyText(this.password)
      this.passToCopy = this.password
      this.$toast.info('password copied to clipboard')
    },
    pastePassword() {
      this.confirmPassword = this.passToCopy
    }
  }
}
</script>

<style lang="scss">
  .signup-container {
    height: 100%;
    display: flex;
    justify-content: center;
  }
  .signup {
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
