<template>
  <div class="loader">
    <div
      :style="{'background-color':color}"
      class="bounce-one"/>
    <div
      :style="{'background-color':color}"
      class="bounce-two"/>
    <div
      :style="{'background-color':color}"
      class="bounce-three"/>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#ffffff'
    }
  }
}
</script>

<style lang="scss">
.loader {
  margin: 0 auto;
  text-align: center;
  position: absolute;
}

.loader > div {
  width: 9px;
  height: 9px;
  background-color: white;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  margin-right: 5px;
  &:last-child {
    margin: 0;
  }
}

.loader .bounce-one {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.loader .bounce-two {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
