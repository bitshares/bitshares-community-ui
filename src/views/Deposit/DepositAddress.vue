<template>
  <div class="deposit-container h-full sm:w-120">
    <div class="deposit-title">Deposit</div>
    <div class="deposit-item">
      <svgicon
        class="deposit-item-cancel"
        width="12"
        height="12"
        color="rgba(255,255,255,0.5)"
        name="cancel"
        @click="toggleAddressScreen(false)"
      />
      <Button
        :text="depositAsset"
        type="secondary"
        width="full"
      />
    </div>
    <div class="deposit-sub-title deposit-sub-title--warning">{{ depositAsset }} to the address below</div>
    <div class="deposit-address">{{ address }}</div>
    <div class="deposit-sub-title deposit-sub-title--warning">IMPORTANT: Send not less than 0.0018 {{ depositAsset }} to this deposit address. Sending less than 0.0018 {{ depositAsset }} or any other currency will result in the loss of your deposit.</div>
    <div class="deposit-sub-title deposit-sub-title--error">ALERT: This asset is backed centralized counterparty</div>
    <div class="deposit-footer">
      <Button
        text="COPY ADDRESS"
        type="secondary"
        width="full"
        class="deposit-btn"
      />
      <Button
        text="CANCEL"
        type="secondary"
        width="full"
        class="deposit-btn"
        @click="toggleModal"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Button from '@/components/Button'
import '@icons/cancel'

export default {
  components: {
    Button
  },
  computed: {
    ...mapGetters({
      depositAddress: 'openledger/getDepositAddress',
      depositAsset: 'deposit/getDepositAsset'
    }),
    address() {
      if (typeof this.depositAddress === 'object') return ''
      return this.depositAddress
    }
  },
  methods: {
    ...mapActions({
      toggleModal: 'deposit/toggleModal',
      toggleAddressScreen: 'deposit/toggleAddressScreen'
    })
  }
}
</script>
<style lang="scss" scoped>
  .deposit-container {
    color: white;
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    min-height: 30rem;

    .loading {
      overflow: initial;
    }
    .deposit-title {
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 1rem;
      font-size: config('textSizes.lg');
    }
    .deposit-sub-title {
      &--warning {
        color: rgba(255, 242, 0, 0.8);
        letter-spacing: -0.0555rem;
        margin-top: 1rem;
        font-size: config('textSizes.base');
      }
      &--error {
        color: rgba(237, 28, 36, 0.8);
        letter-spacing: -0.0555rem;
        margin-top: 1rem;
        font-size: config('textSizes.base');
      }
    }
    .deposit-address {
      width: 80%;
      word-wrap: break-word;
      margin: auto;
      text-align: center;
      letter-spacing: -0.0555rem;
    }
    .deposit-item {
      margin-top: 0;
      position: relative;

      .deposit-item-cancel {
        position: absolute;
        right: 1rem;
        top: 1.2rem;
        z-index: 100;
        cursor: pointer;
      }
    }
    .deposit-btn {
      margin-top: 1rem;
    }
  }
</style>
