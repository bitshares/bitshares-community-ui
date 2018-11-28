<template>
  <div
    :class="{
      'backup-step-word--border': border,
      'backup-step-word--cursor': isCursor
    }"
    class="backup-step-word"
  >
    {{ word }}
  </div>
</template>

<script>
export default {
  props: {
    word: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: false
    },
    isCursor: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
  .backup-step-word {
    font-size: 1.4625rem;
    margin-right: 1.25rem;
    margin-bottom: 0.4375rem;

    &--border {
      font-size: config('textSizes.lg');
      box-sizing: border-box;
      border: 1px dashed config('colors.grey-darkest');
      height: 2rem;
      line-height: 1.5rem;
      padding: 2px 8px 4px;
    }
    &--cursor {
      cursor: pointer;
    }
  }
</style>
