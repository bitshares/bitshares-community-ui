<template>
  <button @click="$emit('click')" class="btn btn-blue">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    /** Sets button text
     */
    text: {
      type: String,
      default: ''
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
