<template>
  <div
    class="card"
  >
    <div class="card-header">
      <div class="title">
        <h2> {{ title }} </h2>
      </div>
      <slot name="header" />
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
  }
}
</script>

<style scoped lang="scss">

.title {
  text-align: left;
  padding: 5px;
  font-weight: config('fontWeights.medium');
}

.card {
  font-family: Gotham_Pro_Regular;
  background-color: config('colors.card-background');
  color: config('colors.card-text');
  text-align: center;
}

</style>
