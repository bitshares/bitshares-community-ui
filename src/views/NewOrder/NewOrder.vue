<template>
  <div class="new-order">
    <NewOrderTabs
      :base="base"
      :quote="quote"
      :type="type"
      :buy-price="marketBuyPrice"
      :sell-price="marketSellPrice"
      @change="setType"
    />
    <Tabs
      :tabs="['MARKET', 'LIMIT']"
      :active="activeIndication"
      @change="setActiveIndication"
    />
    <div class="new-order-fields">
      <NewOrderInput
        title="Spend"
        placeholder="BTC"
        note="max 0.04"
      />
      <NewOrderInput
        title="Get"
        placeholder="USD"
        note="max 437"
      />
    </div>
    <div
      class="new-order-button"
      @click="showConfirmOrder(true)"
    >
      <Btn
        :type="type"
        :text="buttonTitle"
        width="full"
      >
        <span class="operation-title">{{ type }}</span>
      </Btn>
    </div>
    <!-- CONFIRM ORDER -->

    <ConfirmModal
      :show="confirmVisible"
      title="confirm order"
      @close="showConfirmOrder"
    >
      <ConfirmOrder
        :base="base"
        :quote="quote"
        :type="type"
        :price="3874"
        :get="1932"
        :spend="0.5"
        :trading-fee="15.82"
        :exchange-fee="10.23"
        @close="showConfirmOrder"
      />
    </ConfirmModal>

    <!-- <Modal
      v-if="confirmVisible"
      :width-auto="true"
      @close="showConfirmOrder"
    >
      <ConfirmOrder
        :base="base"
        :quote="quote"
        :type="type"
        :price="3874"
        :get="1932"
        :spend="0.5"
        :trading-fee="15.82"
        :exchange-fee="10.23"
        @close="showConfirmOrder"
      />
    </Modal> -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import NewOrderTabs from './NewOrderTabs'
import NewOrderInput from './NewOrderInput'
import Btn from '@/components/Button/Button'
import Tabs from '@/components/Tabs/Tabs'
import ConfirmOrder from '@/views/ConfirmOrder/ConfirmOrder'
import Modal from '@/components/Modal'
import ConfirmModal from '@/views/ConfirmModal/ConfirmModal.vue'

export default {
  components: {
    NewOrderTabs,
    NewOrderInput,
    Btn,
    Tabs,
    ConfirmOrder,
    Modal,
    ConfirmModal
  },
  data() {
    return {
      confirmVisible: false
    }
  },
  computed: {
    ...mapGetters({
      base: 'newOrder/getBase',
      quote: 'newOrder/getQuote',
      orderAmount: 'newOrder/getOrderAmount',
      marketBuyPrice: 'newOrder/getMarketBuyPrice',
      marketSellPrice: 'newOrder/getMarketSellPrice',
      type: 'newOrder/getType',
      activeIndication: 'newOrder/getActiveIndication',
      percentItems: 'newOrder/getPercentItems',
      activePercent: 'newOrder/getActivePercent'
    }),

    buttonTitle() {
      return `${this.orderAmount} ${this.base}`
    }
  },
  methods: {
    ...mapActions({
      setActiveIndication: 'newOrder/setActiveIndication',
      setType: 'newOrder/setType',
      setActivePercent: 'newOrder/setActivePercent'
    }),
    showConfirmOrder(value) {
      this.confirmVisible = value
    }
  }
}
</script>
<style lang="scss">
  .new-order {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;

    .operation-title {
      font-weight: 600;
      display: inline-block;
      margin-right: 0.225rem
    }
    .new-order-button {
      margin-top: auto;
      padding: 0.5rem;
    }
    .new-order-fields {
      margin-top: 3rem;
      display: flex;
      justify-content: space-between;
    }
  }
</style>
