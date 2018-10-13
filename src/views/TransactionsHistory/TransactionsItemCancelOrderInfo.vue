<template>
  <p class="_value">Cancelled order {{ item.payload.order }}</p>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  }
}
</script>
