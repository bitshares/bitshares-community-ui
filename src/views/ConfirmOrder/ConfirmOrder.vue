<template>
  <div class="confirm-order">
    <div class="confirm-order-title">Confirm order</div>
    <div class="confirm-order-date">07-nov-18, 14:39</div>
    <div class="confirm-order-title confirm-order-title--xl">sell btc/usd</div>

    <div class="confirm-order-buttons">
      <Button
        text="Confirm"
        width="full"
        class="confirm-order-btn"
      />
      <Button
        text="Cancel"
        width="full"
        type="faded"
        class="confirm-order-btn"
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
<style lang="scss">
  .confirm-order {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 355px;
    height: 350px;
    background-color: config('colors.card-background');
  }
  .confirm-order-title {
    margin-top: 1.25rem;
    text-transform: uppercase;
    font-size: 0.9375rem;
    font-weight: config('fontWeights.semibold');
    color: config('colors.primary');

    &--xl {
      margin-top: 0.625rem;
      font-size: config('textSizes.xl');
      letter-spacing: -0.0625rem;
      font-weight: normal;
    }
  }
  .confirm-order-date {
    margin-top: 0.625rem;
    color: config('colors.inactive');
    font-size: config('textSizes.base');
    letter-spacing: normal;
    text-transform: uppercase;
  }
  .confirm-order-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: auto .620rem .620rem .620rem;
    padding: .5rem;

    .confirm-order-btn {
      font-weight: normal;
      font-size: config('textSizes.lg');
    }
  }
</style>
