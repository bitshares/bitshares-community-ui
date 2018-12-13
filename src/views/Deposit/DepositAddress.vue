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
        :text="asset"
        :disabled="true"
        type="secondary"
        width="full"
      />
    </div>
    <div class="deposit-sub-title deposit-sub-title--warning">{{ asset }} tokens to the address below</div>
    <div class="deposit-qr-code"/>
    <div class="deposit-loader-wrapper">
      <LoadingContainer :loading="addressPending">
        <div class="deposit-address">{{ address }}</div>
      </LoadingContainer>
    </div>
    <div class="deposit-sub-title deposit-sub-title--warning">IMPORTANT: Send not less than 0.0018 {{ asset }} to this deposit address. Sending less than 0.0018 {{ asset }} or any other currency will result in the loss of your deposit.</div>
    <div class="deposit-sub-title deposit-sub-title--error">ALERT: This asset is backed by centralized counterparty.</div>
    <div class="deposit-footer">
      <Button
        :disabled="!address"
        text="COPY ADDRESS"
        type="secondary"
        width="full"
        class="deposit-btn"
        @click="copyAddress"
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
import LoadingContainer from '@/components/LoadingContainer'
import '@icons/cancel'

export default {
  components: {
    Button,
    LoadingContainer
  },
  computed: {
    ...mapGetters({
      depositAddress: 'openledger/getDepositAddress',
      depositAsset: 'deposit/getDepositAsset',
      addressPending: 'openledger/getAddressPending'
    }),
    address() {
      if (typeof this.depositAddress === 'object') return 'No deposit address'
      return this.depositAddress
    },
    asset() {
      return this.depositAsset.toUpperCase()
    }
  },
  methods: {
    ...mapActions({
      toggleModal: 'deposit/toggleModal',
      toggleAddressScreen: 'deposit/toggleAddressScreen'
    }),
    copyAddress() {
      window.navigator.clipboard.writeText(this.address)
    }
  }
}
</script>
<style lang="scss" scoped>
  .deposit-container {
    color: white;
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    min-height: 35rem;

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
    .deposit-loader-wrapper {
      height: 3rem;
      padding: 0;
    }
    .deposit-address {
      width: 80%;
      word-wrap: break-word;
      margin: auto;
      text-align: center;
      letter-spacing: -0.0555rem;
      height: 3rem;
      padding-top: 0.9375rem;
    }
    .deposit-qr-code {
      background-image: url('data:image/png;base64,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');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: 50%;
      width: 100%;
      min-height: 7rem;
      margin: 0.9375rem auto;
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
  @media screen and (max-width: 800px) {
    .deposit-container {
      .deposit-qr-code {
        height: 100%;
        min-height: auto;
        margin: .4rem auto 0;
      }
    }
  }
</style>
