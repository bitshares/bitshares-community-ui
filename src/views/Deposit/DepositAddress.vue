<template>
  <div class="deposit-container h-full sm:w-120">
    <div class="deposit-title">Deposit</div>
    <div class="deposit-item">
      <Button
        text="ANTI (AntiBitcoin)"
        type="secondary"
        width="full"
      />
    </div>
    <div class="deposit-sub-title deposit-sub-title--warning">Send ANTI (AntiBitcoin) to the address below</div>
    <div class="deposit-address">325ffgTTHABvb578bz6dfdfvbCcciv2bYYTv2300c1bPkhbnbgFVD</div>
    <div class="deposit-sub-title deposit-sub-title--warning">IMPORTANT: Send not less than 0.0018 BTC to this deposit address .Sending less than 0.0018 BTC or any other currency will result in the loss of your deposit.</div>
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
      />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button'

export default {
  components: {
    Button
  }
}
</script>
<style lang="scss" scoped>
  .deposit-container {
    color: white;
    padding: 0 1.2rem 1.2rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 480px;

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
    }
    .deposit-btn {
      margin-top: 1rem;
    }
  }
</style>
