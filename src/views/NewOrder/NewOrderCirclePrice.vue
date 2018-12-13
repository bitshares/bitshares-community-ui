<template>
  <div class="circle-price-container">
    <div
      v-for="(circle, index) in circles"
      :key="index"
      class="circle-price-wrapper"
    >
      <div
        :class="{'_max': circle.base}"
        class="circle-price-item"
      >
        <div
          :style="{
            'border-color': circle.color,
            'transform': getRotate(circle.percent)
          }"
          class="left-side half-circle"
        />
        <div
          :style="{
            'border-color': circle.color,
            'transform': get180rotate(circle.percent),
            'display': getDisplay(circle.percent)
          }"
          class="right-side half-circle"
        />
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
        { base: true, percent: 100, color: '#131313' },
        { base: false, percent: this.percent, color: '#4C4C4C' }
      ]
    }
  },
  methods: {
    getRotate(percent) {
      return `rotate(${percent * 3.6}deg)`
    },
    get180rotate(percent) {
      if (percent > 50) {
        return `rotate(180deg)`
      }
      return ''
    },
    getDisplay(percent) {
      return percent <= 50 ? 'none' : 'block'
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
      &._max {
        clip: rect(auto, auto, auto, auto);
      }
    }
  }
</style>
