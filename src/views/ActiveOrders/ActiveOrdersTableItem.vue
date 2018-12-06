<template>
  <div
    :class="{
      'active-orders-table-item--buy': item.order === 'buy',
      'active-orders-table-item--sell': item.order === 'sell',
      'active-orders-table-item--expanded': expanded
    }"
    class="active-orders-table-item"
  >
    <!--MINI-->
    <div
      v-if="!expanded"
      class="active-orders-table-row"
    >
      <div class="table-item">
        <TwoLineItem
          :top="formattedPayAsset"
          :bottom="formattedReceiveAsset"
        >
          <span slot="bottom">/{{ formattedReceiveAsset }}</span>
        </TwoLineItem>
      </div>
      <div class="table-item">
        <TwoLineItem
          :top="avg"
          :bottom="price"
        />
      </div>
      <div class="table-item text-right">
        <TwoLineItem
          :top="price"
        >
          <div
            slot="bottom"
            :style="{'color': fillColor }"
            class="table-item--filled"
          >
            {{ item.filled }}%
          </div>
        </TwoLineItem>
      </div>
    </div>
    <!-- NORMAL-->
    <div
      v-if="expanded"
      :class="{'active-orders-table-row--expanded': expanded}"
      class="active-orders-table-row"
    >
      <div class="table-item">
        <TwoLineItem
          :top="formattedPayAsset"
          :expanded="expanded"
        >
          <span slot="bottom">/{{ formattedReceiveAsset }}</span>
        </TwoLineItem>
      </div>
      <div class="table-item">
        <TwoLineItem
          :top="avg"
          :bottom="price"
          :expanded="expanded"
        />
      </div>
      <div class="table-item">
        <TwoLineItem
          :top="get"
          :expanded="expanded"
        >
          <span slot="bottom">/{{ formattedReceiveAsset }}</span>
        </TwoLineItem>
      </div>
      <div class="table-item _relative">
        <TwoLineItem
          :top="spend"
          :expanded="expanded"
        >
          <span slot="bottom">/{{ formattedPayAsset }}</span>
        </TwoLineItem>
      </div>
      <div
        v-if="expanded"
        class="table-item"
      >
        <TwoLineItem
          :expanded="expanded"
        >
          <div
            slot="bottom"
            :style="{'color': fillColor }"
            class="table-item--filled"
          >
            {{ item.filled }}%
          </div>
        </TwoLineItem>
      </div>
      <div class="table-item--dates">
        <div class="table-item-date">{{ dateOpen }}</div>
        <div class="table-item-date">{{ timeOpen }}</div>
      </div>
    </div>
    <div
      class="table-item-remove"
      @click="removeActiveOrder(index)"
    >
      <svgicon
        :width="removeSize"
        :height="removeSize"
        color="rgba(255,255,255,.5)"
        name="cancel"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { format } from 'date-fns'
import '@icons/cancel'
import { getFloatCurrency, removePrefix } from '@/helpers/utils'
import TwoLineItem from '@/components/TwoLineItem/TwoLineItem'

export default {
  components: {
    TwoLineItem
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    expanded: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  computed: {
    formattedPayAsset() {
      return removePrefix(this.item.payAssetSymbol)
    },
    formattedReceiveAsset() {
      return removePrefix(this.item.receiveAssetSymbol)
    },
    dateOpen() {
      return format(this.item.dateOpen, 'DD/MM')
    },
    timeOpen() {
      return format(this.item.dateOpen, 'HH:mm')
    },
    price() {
      return getFloatCurrency(this.item.price)
    },
    avg() {
      return getFloatCurrency(this.item.avg)
    },
    vol() {
      return getFloatCurrency(this.item.vol)
    },
    get() {
      return getFloatCurrency(this.item.get)
    },
    spend() {
      return getFloatCurrency(this.item.spend)
    },
    fillColor() {
      const R = Math.round(255 / 100 * this.item.filled)
      return `rgb(${255 - R}, 255, 0)`
    },
    removeSize() {
      return this.expanded ? '14' : '10'
    }
  },
  methods: {
    ...mapActions({
      removeActiveOrder: 'activeOrders/removeActiveOrder'
    })
  }
}
</script>
<style lang="scss">
  .active-orders-table-row {
    color: config('colors.white');
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-left: -0.15rem;
    .table-item--dates {
      position: relative;
    }
  &.active-orders-table-row--expanded {
    grid-template-columns: repeat(6, 1fr);
    .table-item--dates {
      position: relative;
      color: config('colors.inactive');
      .table-item-date {
        font-size: config('textSizes.base');
      }
    }
  }
    ._relative {
      position: relative;
    }
  }
  .active-orders-table-item {
    min-height: 3.125rem;

    &.active-orders-table-item--expanded {
      margin: 0.1250rem 0 0.1250rem 0.1250rem;
      padding-right: 2.8rem;
      overflow-x: hidden;
      padding-left: 1rem;

      .table-item--filled {
        text-align: right;
        font-size: config('textSizes.xl');
      }
      .table-item--filled {
        text-align: right;
        font-size: 1.5625rem;
        padding-top: 0.375rem;
      }
    }
    &:last-child {
      position: relative;
      z-index: 100;
    }
    color: config('colors.text-primary');
    margin: 0.1250rem 0 0.1250rem 0.1250rem;
    grid-auto-flow: column;
    grid-column: 1 / 2;
    grid-row: 1;
    transition: background-color 0.15s ease;
    padding: 0 1.7rem 0 .8rem;
    position: relative;

    .table-item-remove {
      position: absolute;
      right: 0.5625rem;
      top: 1rem;
      cursor: pointer;
    }
    &:hover {
      position: relative;
      z-index: 2;
      background: #131313;
    }
    &--buy {
      border-left: .3125rem solid config('colors.buy');
    }
    &--sell {
      border-left: .3125rem solid config('colors.sell');
    }
  }
  .active-orders-table-row .table-item {
    padding-top: .55rem;
    overflow: hidden;
    word-wrap: break-word;
    font-size: config('textSizes.sm');
    &--ticker {
      margin-top: 0.1rem;
      color: config('colors.inactive');
      font-size: config('textSizes.xs-sm');
    }
    &--dates {
      align-self: center;
      text-align: right;
      font-size: config('textSizes.xs-sm');
    }
  }
  .active-orders-table-item {
    &.active-orders-table-item--expanded {
      .table-item-remove {
        position: absolute;
        right: 0.9375rem;
        top: 1rem;
        cursor: pointer;
      }
      .table-item {
        padding-top: .4rem;
      }
      .table-item--dates {
        margin-top: .4rem;
      }
    }
  }
</style>
