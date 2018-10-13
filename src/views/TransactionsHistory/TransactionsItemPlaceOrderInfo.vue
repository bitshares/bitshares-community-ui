<template>
  <p
    v-if="isBuying"
    class="_value">
    <span> Buy  order</span>
    <span> {{ receive.amount }} {{ receive.assetName }} at {{ ratio }}</span>
    <span class="ratio-assets"> {{ sell.assetName }}/{{ receive.assetName }}</span>
  </p>
  <p
    v-else
    class="_value">
    <span>Sell order </span>
    <span>{{ sell.amount }} {{ sell.assetName }} at {{ ratio }}</span>
    <span class="ratio-assets">{{ receive.assetName }}/{{ sell.assetName }}</span>
  </p>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    min: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      getAssetById: 'assets/getAssetById',
      getHistoryAssetMultiplier: 'history/getHistoryAssetMultiplier'
    }),
    assetSell() {
      return this.getAssetById(this.item.payload.amount_to_sell.asset_id)
    },
    assetReceive() {
      return this.getAssetById(this.item.payload.min_to_receive.asset_id)
    },
    sell() {
      const amount =
        this.item.payload.amount_to_sell.amount / 10 ** this.assetSell.precision
      return {
        amount: amount.toFixed(8).replace(/\.?0+$/, ''),
        assetName: this.assetSell && this.assetSell.symbol
      }
    },
    receive() {
      const amount =
        this.item.payload.min_to_receive.amount /
        10 ** this.assetReceive.precision
      return {
        amount: amount.toFixed(8).replace(/\.?0+$/, ''),
        assetName: this.assetReceive && this.assetReceive.symbol
      }
    },
    isBuying() {
      return this.item.buyer
    },
    ratio() {
      const ratio = this.isBuying
        ? this.sell.amount / this.receive.amount
        : this.receive.amount / this.sell.amount
      return ratio.toFixed(5)
    }
  }
}
</script>
