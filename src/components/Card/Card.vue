<template>
  <div
    class="card lg:mr-2 mb-2 lg:mb-0"
  >
    <div class="card-header">
      <div class="title">
        <div> {{ title }} </div>
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
  }
}
</script>

<style scoped lang="scss">

.card {
  min-height: 25rem;
  max-height: 30rem;
  display: flex;
  flex-direction: column;
  font-family: config('fonts.gotham-regular');
  background-color: config('colors.card-background');
  color: config('colors.text-primary');
  &:last-child {
    @apply mr-0;
  }
}

.card-header {
  padding:config('padding.card-ui');
  display:flex;
  justify-content: space-between;
}

.title {
  font-size: config('textSizes.base');
  font-family: config('fonts.gotham-medium');
  text-transform: uppercase;
}

.header {
  margin-left: auto;
}

.card-body {
  padding:config('padding.card-ui');
  height: 100%;
  overflow: auto;
}

</style>
