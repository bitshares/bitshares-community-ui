<template>
  <div class="order-tabs-titles">
    <div class="order-tabs-title">{{ title }}</div>
    <div
      :class="{'order-tabs-subtitle--sell': isSell}"
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
    isSell: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
  .order-tabs-titles {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 3.5625rem;
  }
  .order-tabs-subtitle {
    font-size: config('textSizes.sm');
    color: rgba(121, 198, 15, 0.5);

    &--sell {
      color:rgba(255, 47, 47, 0.5);
    }
  }
</style>
