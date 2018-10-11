<template>
  <div
    class="card lg:mr-2 mb-2"
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
  font-family: config('fonts.gotham-regular');
  background-color: config('colors.card-background');
  color: config('colors.text-primary');
  padding:config('padding.card-ui');
  &:last-child {
    @apply mr-0;
  }
}

.card-header {
  display:flex;
  justify-content: space-between;
  margin-bottom: config('margin.card-ui-header');
}

.title {
  font-size: config('textSizes.base');
  font-family: config('fonts.gotham-medium');
  text-transform: uppercase;
}

.header {
  margin-left: auto;
}

</style>
