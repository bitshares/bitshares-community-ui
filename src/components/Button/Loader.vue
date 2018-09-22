<template>
  <div class="spinner" :class="{
    'spinner--static': !absolute,
    'spinner--medium': size === 'medium',
    'spinner--small': size === 'small',
    'spinner--big': size === 'big'
  }"></div>
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
    return {};
  }
};

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
    margin-left: -2px;
  }

  .spinner--big:before {
    width: 36px;
    height: 36px;
    margin-top: -33px;
    margin-left: -5px;
    margin-right: 175px;
  }

  .spinner--static:before {
    margin-top: 0;
    margin-left: 0;
    position: static;
  }
</style>