<template>
  <div
    :class="{
      'order-tabs-titles--buy': type === 'buy',
      'order-tabs-titles--sell': type === 'sell',
      '_inactive': inActive
    }"
    class="order-tabs-titles"
  >
    <div class="order-tabs-title">{{ title }}</div>
    <div class="order-tabs-subtitle">
      <svgicon
        v-if="type === 'sell'"
        width="12"
        height="12"
        name="low"
        class="order-tabs-item-icon"
      />
      <span>{{ subTitle }}</span>
      <svgicon
        v-if="type === 'buy'"
        width="12"
        height="12"
        name="high"
        class="order-tabs-item-icon"
      />
    </div>
  </div>
</template>
<script>
import '@/assets/icons/high'
import '@/assets/icons/low'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: [Number, String],
      required: true
    },
    inActive: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'buy'
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

    &.order-tabs-titles--buy {
      .order-tabs-subtitle {
        color: config('colors.buy');

        .order-tabs-item-icon {
          margin-left: 0.12rem;
        }
      }
      &._inactive {
        .order-tabs-subtitle {
          color: config('colors.buy-disabled');
        }
      }
    }
    &.order-tabs-titles--sell {
      .order-tabs-subtitle {
        color: config('colors.sell');

        .order-tabs-item-icon {
          margin-right: 0.14rem;
        }
      }
      &._inactive {
        .order-tabs-subtitle {
          color: config('colors.sell-disabled');
        }
      }
    }
    .order-tabs-title {
      margin-bottom: 0.3125rem;
    }
    .order-tabs-subtitle {
      font-size: 0.6875rem;
    }
  }
</style>
