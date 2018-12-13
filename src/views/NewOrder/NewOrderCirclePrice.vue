<template>
  <div class="circle-price-container">
    <div
      v-for="(circle, index) in circles"
      :key="index"
      :class="{'progress-100': circle.base}"
      class="circle-price-wrapper progress-30"
    >
      <div class="circle-price-item">
        <div class="left-side half-circle"/>
        <div class="right-side half-circle"/>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      circles: [
        { base: true },
        { base: false }
      ]
    }
  }
}
</script>
<style lang="scss">
  $bg-color: #34495e;
  $default-size: 8.75rem;
  $label-font-size: $default-size / 4;
  $label-font-size-redo: $default-size * 4;

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

  @mixin draw-progress($progress, $color) {
    .circle-price-item {
      .half-circle {
        border-color: $color;
      }
      .left-side {
        transform: rotate($progress * 3.6deg);
      }
      @if $progress <= 50 {
        .right-side {
          display: none;
        }
      } @else {
        clip: rect(auto, auto, auto, auto);
        .right-side {
          transform: rotate(180deg);
        }
      }
    }
  }

  .circle-price-wrapper {
    @include size($default-size, $default-size);

    &:nth-child(3n + 1) {
      clear: both;
    }

    .circle-price-item {
      @include size($default-size, $default-size);
      clip: rect(0, $default-size, $default-size, $default-size / 2);
      left: 0;
      position: absolute;
      top: 0;

      .half-circle {
        @include size($default-size, $default-size);
        border: 5px solid #3498db;
        border-radius: 50%;
        clip: rect(0, $default-size / 2, $default-size, 0);
        left: 0;
        position: absolute;
        top: 0;
      }
    }

    &.progress-30 {
      @include draw-progress(30, #4C4C4C);
    }
    &.progress-100 {
      @include draw-progress(100, #131313);
    }
  }
</style>
