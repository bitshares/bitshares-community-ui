<template>
  <div class="circles">
    <!--dynamic-->
    <div
      :class="{'circle-container--positive': isPositive}"
      class="circle-container"
    >
      <div class="circle-wrapper">
        <div class="circle-item">
          <div
            :style="{'transform': rotate}"
            class="half-circle-item"
          />
        </div>
      </div>
    </div>
    <!-- layout-->
    <div>
      <div
        v-for="(item, index) in layoutItems"
        :key="index"
        :class="{'circle-container--positive': item.isPositive}"
        class="circle-container"
      >
        <div class="circle-wrapper">
          <div class="circle-item">
            <div
              :style="{
                'transform': getLayoutRotate(item.isPositive),
                'border': '3px solid ' + item.color
              }"
              class="half-circle-item"
            />
          </div>
        </div>
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
  data() {
    return {
      layoutItems: [
        { color: 'rgba(121,198,16,.5)', isPositive: true },
        { color: 'rgb(255,48,48,.5)', isPositive: false }
      ]
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
    rotate() {
      if (this.value < 0) {
        return `rotate(${this.digit * 0.9}deg)`
      } else {
        return `rotate(-${this.digit * 0.9}deg)`
      }
    }
  },
  methods: {
    getLayoutRotate(isPositive) {
      if (isPositive) {
        return `rotate(-${100 * 0.9}deg)`
      } else {
        return `rotate(${100 * 0.9}deg)`
      }
    }
  }
}
</script>
<style lang="scss">
  $default-size: 7.75rem;

  .circles {
    pointer-events: none;
    // z-index: -100;
  }

  .circle-container {  
    transform: scale(1.2, 1.2);
    position: absolute;
    top: 48%;
    left: 33%;
    width: $default-size;
    height: $default-size;
  }
  @mixin size($width, $height) {
    height: $height;
    width: $width;
  }

  .circle-wrapper {
    @include size($default-size, $default-size);

    .circle-item {
      @include size($default-size, $default-size);
      clip: rect(0, $default-size / 2, $default-size, 0);
      left: 0;
      position: absolute;
      top: 0;
      .half-circle-item {
        @include size($default-size, $default-size);
        border: 3px solid config('colors.sell');
        border-radius: 50%;
        clip: rect(0, $default-size, $default-size, $default-size / 2);
        left: 0;
        position: absolute;
        top: 0;
      }
    }
  }

  .circle-container--positive {
    .circle-item {
      clip: rect(0, $default-size, $default-size, $default-size / 2);
      .half-circle-item {
        border: 3px solid config('colors.buy');
        clip: rect(0, $default-size / 2, $default-size, 0);
      }
    }
  }
</style>
