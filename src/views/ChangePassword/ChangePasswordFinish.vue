<template>
  <div class="password-container">
    <div class="password-finish-content">Successfully! Next time you sign in, use your new password</div>
    <div class="password-btn-wrapper">
      <Button
        text="Finish"
        width="full"
        class="password-btn-item"
        @click="toggle"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Button from '@/components/Button'

export default {
  components: {
    Button
  },
  methods: {
    ...mapActions({
      toggle: 'changePassword/toggleModal'
    })
  }
}
</script>
<style lang="scss">
  .password-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .password-finish-content {
    font-size: config('textSizes.lg');
    text-align: center;
    display: flex;
    margin-top: auto;;
  }
  .password-btn-wrapper {
    display: flex;
    margin-top: auto;

    .password-btn-item {
      margin-top: .5rem;
    }
  }
  @screen sm {
    .password-container {
      height: 30rem;
    }
  }
</style>
