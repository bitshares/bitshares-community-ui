<template>
  <div
    class="card"
  >
    <div class="card-header">
      <div class="title">
        <div> {{ upper(title) }} </div>
      </div>
      <slot
        class="header"
        name="header" />
    </div>
    <div class="card-body">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    upper(text) {
      text = text.toUpperCase()
      return text
    }
  }
}
</script>

<style scoped lang="scss">

.card {
  font-family: config('fonts.gotham-regular');
  background-color: config('colors.card-background');
  color: config('colors.card-text');
  padding:config('padding.card-ui')
}

.card-header {
  display:flex;
  justify-content: space-between;
  margin-bottom: config('margin.card-ui-header');
}

.title {
  text-align: left;
  font-size: config('textSizes.base');
}

.header {
  margin-left: auto;
}

</style>
