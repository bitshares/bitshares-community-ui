<template>
  <div class="deposit-container h-full sm:w-120">
    <div class="deposit-title">Deposit</div>
    <div class="deposit-sub-title">Choose token</div>
    <div class="desposit-search">
      <SimpleInput
        :value="searchStr"
        :centered="true"
        @input="onSearch"
      />
    </div>
    <LoadingContainer :loading="!filteredList.length">
      <ScrollingContainer
        :shadower-height="0"
      >
        <div class="deposit-content">
          <div
            v-for="(deposit, index) in filteredList"
            :key="index"
            class="deposit-item"
            @click="toggleAddressScreen(true)"
          >
            <Button
              :text="deposit"
              type="secondary"
              width="full"
              class="example-button"
            />
          </div>
        </div>
      </ScrollingContainer>
    </LoadingContainer>
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
      fetching: 'openledger/pending'
    }),
    coinslist() {
      return Object.keys(this.coins).map(coin => coin)
    },
    filteredList() {
      if (!this.searchStr) return this.coinslist
      return this.coinslist.filter(deposit => deposit.indexOf(this.searchStr) > -1)
    }
  },
  mounted() {
    this.fetchCoins()
  },
  methods: {
    ...mapActions({
      toggleAddressScreen: 'deposit/toggleAddressScreen',
      fetchCoins: 'openledger/fetchCoins'
    }),
    onSearch(str) {
      this.searchStr = str
    }
  }
}
</script>
<style lang="scss">
  .deposit-container {
    color: white;
    padding: 0.6rem;
    display: flex;
    flex-direction: column;

    .deposit-content {
      overflow-y: auto;
      height: 30rem;
    }
    .deposit-title {
      font-size: config('textSizes.lg');
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
    .deposit-sub-title {
      font-size: config('textSizes.lg');
      text-align: center;
    }
    .deposit-item {
      margin-top: 15px;
    }
    .example-button {
      margin-top: auto;
    }
  }
</style>
