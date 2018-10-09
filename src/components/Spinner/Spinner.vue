<template>
  <div
    :class="{
      'spinner--static': !absolute,
      'spinner--medium': size === 'medium',
      'spinner--small': size === 'small',
      'spinner--big': size === 'big'
    }"
    class="spinner"/>
</template>

<script>

export default {
  props: {
    size: {
      type: String,
      required: false,
      default: 'medium'
    },
    absolute: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {}
  }
}

</script>

<style lang="scss">
  @keyframes spinner {
    to {transform: rotate(360deg);}
  }

  .spinner:before {
    content: '';
    box-sizing: border-box;
    border-radius: 50%;
    border: 2px solid gray;
    border-top-color: white;
    animation: spinner .7s linear infinite;
    display: block;
    position: relative;
    left: 0%;
  }

  .spinner--medium:before {
    width: 20px;
    height: 20px;
    margin-top: -20px;
    margin-left: -10px;
    margin-right: 110px;
  }

  .spinner--small:before {
    width: 14px;
    height: 14px;
    margin-top: -13px;
    margin-right: 70px;
    margin-left: -10px;
  }

  .spinner--big:before {
    width: 30px;
    height: 30px;
    margin-top: -30px;
    margin-bottom:-0px;
    margin-left: -20px;
    margin-right: 140px;
  }

  .spinner--static:before {
    position: static;
  }
</style>
