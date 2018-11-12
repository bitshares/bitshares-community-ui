<template>
  <div
    :class="{'backup-step-word--border': border}"
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
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
  .backup-step-word {
    font-size: 1.5625rem;
    margin-right: 1.25rem;
    margin-bottom: 0.4375rem;

    &--border {
      font-size: config('textSizes.lg');
      box-sizing: border-box;
      border: 1px solid config('colors.white');
      height: 2rem;
      line-height: 1.5rem;
      padding: 2px 8px 4px;
    }
  }
</style>
