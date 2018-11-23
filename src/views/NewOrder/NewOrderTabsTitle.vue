<template>
  <div class="order-tabs-titles">
    <div class="order-tabs-title">{{ title }}</div>
    <div
      :class="{'order-tabs-subtitle--increased': !!increased}"
      class="order-tabs-subtitle"
    >{{ subTitle }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: Number,
      required: true
    },
    increased: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
  .order-tabs-title {
    height: 65px;
    margin-top: -7px;
  }
  .order-tabs-subtitle {
    font-size: config('textSizes.sm');
    margin-top: -45px;
    color:rgba(255, 47, 47, 0.5);

    &--increased {
      color: rgba(121, 198, 15, 0.5);
    }
  }
</style>
