<template>
  <div class="confirm-order">
    <div
      class="confirm-order-close"
      @click="$emit('close', false)"
    >
      <svgicon
        width="12"
        height="12"
        color="rgba(255,255,255,0.5)"
        name="cancel"
      />
    </div>
    <div class="confirm-order-title">Confirm order</div>
    <div class="confirm-order-date">07-nov-18, 14:39</div>
    <div class="confirm-order-title confirm-order-title--xl">sell btc/usd</div>

    <!-- SECTION 1 -->
    <div class="confirm-order-price-section">
      <div class="confirm-order-price-section-item">
        <NewOrderInput
          title="Price. USD"
          placeholder="3874"
        />
      </div>
      <div class="confirm-order-price-section-item">
        <NewOrderInput
          title="Spend. BTC"
          placeholder="0.5"
        />
      </div>
      <div class="confirm-order-price-section-item">
        <NewOrderInput
          title="Get. USD"
          placeholder="1932"
        />
      </div>
    </div>
    <!-- SECTION 2 -->
    <div class="confirm-order-price-section">
      <div class="confirm-order-price-section-item">
        <NewOrderInput
          title="Trading fee. USD"
          placeholder="15.82"
          note="~15.82 USD"
        />
      </div>
      <div class="confirm-order-price-section-item">
        <NewOrderInput
          title="Exchange fee. USD"
          placeholder="10.23"
          note="~10.23 USD"
        />
      </div>
    </div>

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
import NewOrderInput from '@/views/NewOrder/NewOrderInput'

export default {
  components: {
    Button,
    NewOrderInput
  }
}
</script>
<style lang="scss">
  .confirm-order {
    position: relative;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 22.1875rem;
    height: 21.875rem;
    background-color: config('colors.card-background');
  }
  .confirm-order-close {
    position: absolute;
    right: 0.625rem;
    top: 0.4375rem;
    cursor: pointer;
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

  .confirm-order-price-section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 80%;
    margin-top: 15px;
  }
  .confirm-order-price-section-item {
    margin: .2rem;
  }
</style>
