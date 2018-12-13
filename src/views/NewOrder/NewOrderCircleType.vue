<template>
  <div
    :class="{'circle-price-container--positive': isPositive}"
    class="circle-price-container"
  >
    <div class="circle-price-wrapper">
      <div class="circle-price-item">
        <div
          :style="{'transform': positiveRotate}"
          class="half-circle"
        />
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    isPositive() {
      return this.value >= 0 && this.value <= 100
    },
    digit() {
      if (this.value < 0) {
        return -this.value
      }
      return this.value
    },
    positiveRotate() {
      if (this.value < 0) {
        return `rotate(${this.digit * 0.9}deg)`
      } else {
        return `rotate(-${this.digit * 0.9}deg)`
      }
    }
  }
}
</script>
<style lang="scss">
  $default-size: 8.75rem;

  .circle-price-container {
    position: absolute;
    top: 48%;
    left: 31%;
    width: $default-size;
    height: $default-size;
  }
  @mixin size($width, $height) {
    height: $height;
    width: $width;
  }

  .circle-price-wrapper {
    @include size($default-size, $default-size);

    .circle-price-item {
      @include size($default-size, $default-size);
      clip: rect(0, $default-size / 2, $default-size, 0);
      left: 0;
      position: absolute;
      top: 0;
      .half-circle {
        @include size($default-size, $default-size);
        border: 5px solid config('colors.sell-disabled');
        border-radius: 50%;
        clip: rect(0, $default-size, $default-size, $default-size / 2);
        left: 0;
        position: absolute;
        top: 0;

      }
    }
  }

  .circle-price-container--positive {
    .circle-price-item {
      clip: rect(0, $default-size, $default-size, $default-size / 2);
      .half-circle {
        border: 5px solid config('colors.buy-disabled');
        clip: rect(0, $default-size / 2, $default-size, 0);
      }
    }
  }
</style>
