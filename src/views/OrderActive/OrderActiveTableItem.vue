<template>
  <div
    :class="{
      'order-active-table-item--buy': item.order === 'buy',
      'order-active-table-item--sell': item.order === 'sell',
      'order-active-table-item--last': isLast,
      'order-active-table-item--expanded': expanded
    }"
    class="order-active-table-item"
  >
    <!--MINI-->
    <div
      v-if="!expanded"
      :class="{'order-active-table-row--expanded': expanded}"
      class="order-active-table-row"
    >
      <div class="table-item">
        <div class="table-item-base">{{ item.payAssetSymbol }}</div>
        <div class="table-item--ticker">/{{ item.receiveAssetSymbol }}</div>
      </div>
      <div class="table-item">
        <div class="table-item-base">{{ avg }}</div>
        <div class="table-item--ticker">{{ price }}</div>
      </div>
      <div class="table-item">
        <div class="table-item-base _alignRight">{{ price }}</div>
        <div
          :style="{'color': fillColor }"
          class="table-item--filled"
        >
          {{ filled }}
        </div>
      </div>
    </div>
    <!-- NORMAL-->
    <div
      v-if="expanded"
      :class="{'order-active-table-row--expanded': expanded}"
      class="order-active-table-row"
    >
      <div class="table-item">
        <div class="table-item-base">{{ item.payAssetSymbol }}</div>
        <div class="table-item--ticker">/{{ item.receiveAssetSymbol }}</div>
      </div>
      <div class="table-item">
        <div class="table-item-base">{{ price }}</div>
        <div class="table-item--ticker">{{ item.receiveAssetSymbol }}</div>
      </div>
      <div class="table-item">
        <div class="table-item-base">{{ get }}</div>
        <div class="table-item--ticker">{{ item.receiveAssetSymbol }}</div>
      </div>
      <div class="table-item _relative">
        <div class="table-item-base">{{ spend }}</div>
        <div class="table-item--ticker">{{ item.payAssetSymbol }}</div>
      </div>
      <div
        v-if="expanded"
        class="table-item"
      >
        <div
          :style="{'color': fillColor }"
          class="table-item--filled"
        >
          {{ filled }}
        </div>
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
import { getFloatCurrency } from '@/helpers/utils'
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    isLast: {
      type: Boolean,
      default: false
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
    filled() {
      return `${this.item.filled}%`
    },
    fillColor() {
      const R = Math.round(255 / 100 * this.item.filled)
      return `rgb(${255 - R}, 255, 0)`
    },
    removeSize() {
      if (this.expanded) {
        return '18'
      }
      return '10'
    }
  },
  methods: {
    ...mapActions({
      removeActiveOrder: 'orderActive/removeActiveOrder'
    })
  }
}
</script>
<style lang="scss">
  .order-active-table-row {
    color: config('colors.white');
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 3.9375rem;
    .table-item--dates {
      position: relative;
    }
    .table-item-base {
      font-size: config('textSizes.lg');
      padding-top: .3rem;
    }
    .table-item--ticker {
      font-size: config('textSizes.base');
    }
    &--expanded {
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
  .order-active-table-item {
    color: config('colors.text-primary');
    margin: 0.1250rem 0 0.1250rem 0.1250rem;
    grid-auto-flow: column;
    grid-column: 1 / 2;
    grid-row: 1;
    transition: background-color 0.15s ease;
    padding: 0 1.5rem 0 1rem;
    position: relative;

    .table-item--filled {
      text-align: right;
      font-size: config('textSizes.base');
    }

    .table-item-remove {
      position: absolute;
      right: 10px;
      top: 22px;
      cursor: pointer;
    }

    &--expanded {
      margin: 0.1250rem 0 0.1250rem 0.1250rem;
      padding-right: 2.8rem;
      overflow-x: hidden;

      .table-item--filled {
        text-align: right;
        font-size: config('textSizes.xl');
      }
      .table-item-remove {
        position: absolute;
        right: 15px;
        top: 22px;
        cursor: pointer;
      }
    }
    &:hover {
      position: relative;
      z-index: 2;
      background: #131313;
    }
    &--buy {
      border-left: 7px solid config('colors.buy');
    }
    &--sell {
      border-left: 7px solid config('colors.sell');
    }
    &--last {
      position: relative;
      z-index: 100;
    }
  }
  .order-active-table-row .table-item {
    padding-right: 0.25rem;
    // align-self: center;
    padding-top: 0.5rem;
    overflow: hidden;
    word-wrap: break-word;
    // text-overflow: ellipsis;
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
  .table-item > .table-item-base {
    // white-space: nowrap;
    overflow: hidden;
    word-break: break-all;
    // text-overflow: ellipsis;
    &._alignRight {
      text-align: right;
    }
  }
</style>
