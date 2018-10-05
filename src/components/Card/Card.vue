<template>
  <div
    :class="{
      'card-dark': theme === 'dark',
      'card-light': theme === 'light'
    }"
    class="card-main"
  >
    <div class="title">
      {{ title }}
    </div>
    <hr>
    <div class="card-header">
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
      default: () => ''
    },
    theme: {
      type: String,
      default: () => 'light'
    }
  }
}
</script>

<style scoped lang="scss">

.title {
  font-size: 18px;
}

.card-header {}

.card-dark {
  background-color: config('colors.card-background-dark');
  color: config('colors.card-background-light');
}

.card-light {
  background-color: config('colors.card-background-light');
  color: config('colors.card-background-dark');
}

.card-main{
  text-align: center;
}
</style>
