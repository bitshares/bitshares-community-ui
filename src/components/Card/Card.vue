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
    <ScrollingContainer :shadower-height="20">
      <div class="card-body">
        <slot name="body" />
      </div>
    </ScrollingContainer>
  </div>
</template>

<script>
import ScrollingContainer from '@/components/ScrollingContainer/ScrollingContainer.vue'
export default {
  components: { ScrollingContainer },
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
  padding-bottom: 5px;
  display:flex;
  flex-shrink: 0;
  justify-content: space-between;
}

.title {
  font-size: config('textSizes.base');
  font-family: config('fonts.gotham-medium');
  text-transform: uppercase;
  font-size: config('textSizes.base');
}

.header {
  margin-left: auto;
}

.card-body {
  @apply p-card-ui pt-5;
  height: 100%;
  overflow: auto;
}

</style>
