<template>
  <div class="new-order-input">
    <SimpleInput
      v-model="value"
      type="number"
      :title="title"
      :placeholder="placeholder"
    />
    <div class="new-order-input--note">{{ note }}</div>
  </div>
</template>
<script>
import SimpleInput from '@/components/SimpleInput'

export default {
  components: {
    SimpleInput
  },
  props: {
    title: {
      type: String,
      default: 'Spend'
    },
    placeholder: {
      type: String,
      default: 'BTC'
    },
    note: {
      type: String,
      required: true
    },
    aside: {
      type: String,
      default: 'left'
    }
  },
  data() {
    return {
      value: ''
    }
  }
}
</script>
<style lang="scss">
  .new-order-input {
    width: 53px;
  }
</style>
