<template>
  <div class="withdraw-container h-full sm:w-120">
    <div class="withdraw-title">withdraw</div>

    <div class="withdraw-content">Are you sure you want to withdraw {{ withdrawAmount }} {{ withdrawAsset.tiker.toUpperCase() }} to {{ withdrawAddress }} address?</div>
    <div class="withdraw-footer">
      <Button
        text="confirm withdrawal"
        width="full"
        class="withdraw-btn"
        @click="toggle"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Button from '@/components/Button'

export default {
  components: {
    Button
  },
  computed: {
    ...mapGetters({
      withdrawAsset: 'withdraw/getWithdrawAsset',
      withdrawAmount: 'withdraw/getWithdrawAmount',
      withdrawAddress: 'withdraw/getWithdrawAddress'
    })
  },
  methods: {
    ...mapActions({
      toggle: 'withdraw/toggleModal'
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
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 1rem;
      font-size: config('textSizes.lg');
    }
    .withdraw-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      padding: 1.5rem;
      line-height: 2;
      word-break: break-word;
      margin-top: auto;
      font-size: config('textSizes.lg');
    }
    .withdraw-footer {
      display: flex;
      margin-top: auto;
    }
    .withdraw-title {
      font-size: config('textSizes.lg');
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
  }
</style>
