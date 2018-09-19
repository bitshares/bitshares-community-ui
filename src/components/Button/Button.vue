<template>
  <button @click="$emit('click')" class="btn btn-blue"
    :isLoading="isLoading"
    :disabled="isLoading"
    :status="status">
    {{ text }}
  </button>
</template>

<script>
import VueButtonSpinner from 'vue-button-spinner'
import axios from 'axios';
export default {
  name: 'Button',
  props: {
    /** Sets button text
     */
    text: {
      type: String,
      default: 'Button'
    },
    /** Sets disabled state
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /** Sets loading state
     */
    loading: {
      type: Boolean,
      default: false
    },
    /** Sets size state
     */
    size: {
      type: String,
      default: 'normal'
    },
    /** Sets width state
     */
    width: {
      type: String,
      default: 'full'
    },
    /** Sets loading state
     */
    type: {
      type: String,
      default: 'round'
    }
  },
  data () {
    return {
      isLoading: false,
      status: ''
    }
  },
  components: {
    VueButtonSpinner
  },
  methods: {
    onSubmit () {
      this.isLoading = true
      axios.get('/url', 'GET')
        .then(response => {
          this.isLoading = false
          this.status = true // or success
          setTimeout(() => { this.status = '' }, 2000) // to clear the status :)
        })
        .catch(error => {
          console.error(error)
          this.isLoading = false
          this.status = false // or error
        })
    }
  }
}
</script>

<style lang="scss">
.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
  @apply bg-blue text-white;
}
.btn-blue:hover {
  @apply bg-blue-dark;
}
</style>
