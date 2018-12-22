<template>
  <div class="deposit-container h-full sm:w-120">
    <div class="deposit-title">Deposit</div>
    <div class="deposit-sub-title">Choose token</div>
    <div class="deposit-loader-wrapper">
      <LoadingContainer :loading="coinsPending">
        <div class="desposit-search">
          <SimpleInput
            :centered="true"
            placeholder="SEARCH"
            @input="onSearch"
          />
        </div>
        <ScrollingContainer
          :shadower-height="12"
        >
          <div class="deposit-content">
            <Button
              v-for="(asset, index) in filteredList"
              :key="index"
              :text="asset"
              type="secondary"
              width="full"
              class="deposit-item"
              @click="selectAsset(asset)"
            />
          </div>
        </ScrollingContainer>
      </LoadingContainer>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Button from '@/components/Button'
import ScrollingContainer from '@/components/ScrollingContainer'
import SimpleInput from '@/components/SimpleInput'
import LoadingContainer from '@/components/LoadingContainer'

export default {
  components: {
    Button,
    ScrollingContainer,
    SimpleInput,
    LoadingContainer
  },
  data() {
    return {
      searchStr: ''
    }
  },
  computed: {
    ...mapGetters({
      coins: 'openledger/getCoinsData',
      coinsPending: 'openledger/getCoinsPending'
    }),
    coinslist() {
      return Object.keys(this.coins).map(coin => coin)
    },
    filteredList() {
      if (!this.searchStr) return this.coinslist
      return this.coinslist.filter(deposit => deposit.indexOf(this.searchStr) > -1)
    }
  },
  created() {
    this.fetchCoins()
  },
  methods: {
    ...mapActions({
      toggleAddressScreen: 'deposit/toggleAddressScreen',
      setDepositAsset: 'deposit/setDepositAsset',
      fetchCoins: 'openledger/fetchCoins',
      fetchDepositAddress: 'openledger/fetchDepositAddress'
    }),
    selectAsset(asset) {
      this.fetchDepositAddress({ asset })
      this.setDepositAsset({ asset })
      this.toggleAddressScreen(true)
    },
    onSearch(str) {
      this.searchStr = str
    }
  }
}
</script>
<style lang="scss">
  .deposit-container {
    color: white;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;

    .deposit-loader-wrapper {
      height: 100%;
      overflow-y: auto;
      padding: .2rem 0 0;
      margin-top: 1rem;
    }
    .deposit-content {
      overflow-y: auto;
      height: 27rem;
    }
    .deposit-title {
      font-size: config('textSizes.lg');
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 1rem;
      font-weight: config('fontWeights.bold');
    }
    .deposit-sub-title {
      font-size: config('textSizes.lg');
      text-align: center;
    }
    .deposit-item {
      margin-top: 0.9375rem;

      &:last-child {
        position: relative;
        z-index: 10;
      }
    }
  }
  @media screen and (max-width: 800px) {
    .deposit-container {
      .deposit-content {
        height: 100%;
      }
    }
  }
</style>
