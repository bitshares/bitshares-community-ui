<template>
  <div class="withdraw-container h-full sm:w-120">
    <div class="withdraw-title">Withdraw</div>
    <div class="withdraw-item">
      <svgicon
        class="withdraw-item-cancel"
        width="12"
        height="12"
        color="rgba(255,255,255,0.5)"
        name="cancel"
      />
      <Button
        :text="withdrawAsset.tiker"
        :disabled="true"
        type="secondary"
        width="full"
      />
    </div>
    <div class="withdraw-sub-title">Enter withdrawal amount</div>
    <div class="withdraw-sub-title withdraw-sub-title--description-upper">withdrawal amount</div>
    <SimpleInput
      :value="amount"
      :centered="true"
      :placeholder="withdrawAsset.tokens"
      :no-padding="true"
      @input="confirm"
    />
    <div class="withdraw-sub-title withdraw-sub-title--description-lower">{{ maxWithdrawTitle }}</div>
    <div class="withdraw-footer">
      <Button
        text="Confirm amount"
        type="secondary"
        width="full"
        class="withdraw-btn"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Button from '@/components/Button'
import SimpleInput from '@/components/SimpleInput'
import '@icons/cancel'

export default {
  components: {
    Button,
    SimpleInput
  },
  data() {
    return {
      amount: ''
    }
  },
  computed: {
    ...mapGetters({
      withdrawAsset: 'withdraw/getWithdrawAsset'
    }),
    maxWithdrawTitle() {
      return `max ${this.withdrawAsset.tokens} ${this.withdrawAsset.tiker}`
    }
  },
  methods: {
    confirm() {
    }
  }
}
</script>
<style lang="scss" scoped>
  .withdraw-container {
    color: config('colors.primary');
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    min-height: 19.375rem;
    .loading {
      overflow: initial;
    }
    .withdraw-title {
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 1rem;
      font-size: config('textSizes.lg');
    }
    .withdraw-sub-title {
      letter-spacing: -0.0555rem;
      margin-top: 1rem;
      margin-bottom: 1rem;

      &--description-upper {
        text-transform: uppercase;
        text-align: center;
        font-size: config('textSizes.xxs');
        color: config('colors.inactive');
        margin: 0;
      }
      &--description-lower {
        text-align: center;
        font-size: config('textSizes.xxs');
        color: config('colors.inactive');
        margin: 0.3125rem 0 1.5rem 0;
      }
    }
    .withdraw-item {
      margin-top: 0;
      position: relative;
      .withdraw-item-cancel {
        position: absolute;
        right: 1rem;
        top: 1.2rem;
        z-index: 100;
        cursor: pointer;
      }
    }
  }
</style>
