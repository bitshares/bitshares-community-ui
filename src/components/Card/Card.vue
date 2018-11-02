<template>
  <div
    class="card lg:mr-2 mb-2 lg:mb-0"
  >
    <div class="card-header">
      <div class="title">
        <div> {{ title }} </div>
      </div>
      <slot name="modal"/>
      <slot
        class="header"
        name="header" />
    </div>
    <!-- <ScrollingContainer :shadower-height="20"> -->
    <div class="card-body">
      <slot name="body" />
    </div>
    <!-- </ScrollingContainer> -->
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
  height: 25rem;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  font-family: config('fonts.gotham-regular');
  background-color: config('colors.card-background');
  color: config('colors.text-primary');
  border: 1px solid config('colors.card-border');
  transition: max-height 0.2s;
  &:last-child {
    @apply mr-0;
  }
}

.card-expanded {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #7a7675;

  &:hover {
    cursor: pointer;
    background: #7a7675;
  }
}

.card-header {
  padding:config('padding.card-ui');
  padding-bottom: 5px;
  display:flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: baseline;
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
  @apply pt-3;
  height: 100%;
  overflow: hidden;
}

</style>
