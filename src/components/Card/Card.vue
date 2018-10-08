<template>
  <div
    class="card"
  >
    <div class="card-header">
      <div class="title">
        <h2> {{ upper(title) }} </h2>
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
  padding:15px;
}

.card-header {
  display:flex;
  justify-content: space-between;
  margin-bottom: 45px;
}

.title {
  text-align: left;
}

.header {
  margin-left: auto;
}

</style>
