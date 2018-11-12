<template>
  <div class="backup-step-word">{{ word }}</div>
</template>

<script>
export default {
  props: {
    word: {
      type: String,
      default: ''
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
  }
</style>
