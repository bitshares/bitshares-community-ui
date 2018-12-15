<template>
  <div class="withdraw-container h-full sm:w-120">
    <div class="withdraw-title">withdraw</div>
    <div class="withdraw-sub-title">Please scan QR code or enter transfer address manually</div>
    <SimpleInput
      v-model="address"
      :centered="true"
      title="withdrawal address"
      class="withdraw-input"
    />
    <div class="withdraw-footer">
      <Button
        text="Confirm address"
        type="secondary"
        width="full"
        class="withdraw-btn"
        @click="setWithdrawStep('withdrawFinish')"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Button from '@/components/Button'
import SimpleInput from '@/components/SimpleInput'

export default {
  components: {
    Button,
    SimpleInput
  },
  data() {
    return {
      address: ''
    }
  },
  methods: {
    ...mapActions({
      setWithdrawStep: 'withdraw/setWithdrawStep'
    })
  }
}
</script>
<style lang="scss" scoped>
  .withdraw-container {
    color: config('colors.primary');
    padding: 0.6rem;
    display: flex;
    flex-direction: column;
    height: 100%;

    .withdraw-title {
      font-size: config('textSizes.lg');
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
    .withdraw-sub-title {
      font-size: config('textSizes.lg');
      text-align: center;
    }
    .withdraw-input {
      margin-top: auto;
      display: flex;
    }
    .withdraw-footer {
      margin-top: auto;
      display: flex;
    }
  }
</style>
