<template>
  <div
    :class="{
      'new-order-input--left': aside === 'left',
      'new-order-input--right': aside === 'right'
    }"
    class="new-order-input"
  >
    <div class="new-order-input--title">{{ title }}</div>
    <!--<SimpleInput
      v-model="value"
      type="number"
    />-->
    <input
      type="text"
      :placeholder="placeholder"
      class="new-order-input--field"
    >
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
      value: this.placeholder
    }
  }
}
</script>
<style lang="scss">
  .new-order-input {
    width: 70px;
    font-size: config('textSizes.xl');
    margin-top: -14px;

    &--note {
      color: config('colors.primary');
      font-size: 0.6875rem;
      letter-spacing: normal;
    }

    &--title {
      color: config('colors.inactive');
      font-size: 0.6875rem;
      letter-spacing: normal;
    }

    &--left {
      margin-left: 40px;
    }

    &--right {
      margin-right: 15px;
    }

    &--field {
      width: 100%;
      outline: none;
      margin-top: 3px;
      margin-bottom: 3px;
      background-color: transparent;
      border-left: 1px solid config('colors.primary');
      color: config('colors.primary');
      font-size: config('textSizes.xl');
    }
  }
</style>
