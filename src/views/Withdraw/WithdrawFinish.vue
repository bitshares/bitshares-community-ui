<template>
  <div class="withdraw-form">
    <div class="withdraw-content withdraw-content--auto">Are you sure you want to withdraw {{ withdrawAmount }} {{ withdrawAsset.tiker.toUpperCase() }} to {{ withdrawAddress }} address?</div>
    <div class="withdraw-footer">
      <Button
        text="confirm withdrawal"
        width="full"
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
  .withdraw-form {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .withdraw-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    line-height: 2;
    word-break: break-word;
    margin-top: auto;
    font-size: config('textSizes.lg');
  }
  .withdraw-footer {
    display: flex;
    margin-top: auto;
    padding-top: 1rem;
    margin-bottom: .5rem;
  }
  .withdraw-title {
    font-size: config('textSizes.lg');
    text-align: center;
    text-transform: uppercase;
  }
  @media screen and (max-width: 800px) {
    .withdraw-content {
      &--auto {
        height: auto;
      }
    }
  }
</style>
