<template>
  <div class="withdraw-container h-full sm:w-120">
    <div class="withdraw-title">withdraw</div>
    <div class="withdraw-sub-title">Choose token</div>
    <div class="withdraw-loader-wrapper">
      <LoadingContainer :loading="!coinslist.length">
        <ScrollingContainer
          :shadower-height="0"
        >
          <div class="withdraw-content">
            <Button
              v-for="(asset, index) in coinslist"
              :key="index"
              :text="asset.tiker"
              type="secondary"
              width="full"
              class="withdraw-item"
              @click="selectAsset(asset)"
            />
          </div>
        </ScrollingContainer>
      </LoadingContainer>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ScrollingContainer from '@/components/ScrollingContainer'
import LoadingContainer from '@/components/LoadingContainer'
import Button from '@/components/Button'

export default {
  components: {
    ScrollingContainer,
    LoadingContainer,
    Button
  },
  computed: {
    ...mapGetters({
      coins: 'portfolio/getItems'
    }),
    coinslist() {
      console.log(this.coins)
      return this.coins.filter(coin => coin.tokens > 0)
    }
  },
  methods: {
    ...mapActions({
      setWithdrawAsset: 'withdraw/setWithdrawAsset',
      setWithdrawStep: 'withdraw/setWithdrawStep'
    }),
    selectAsset(asset) {
      this.setWithdrawAsset({ asset })
      this.setWithdrawStep('withdrawConfirm')
    }
  }
}
</script>
<style lang="scss">
  .withdraw-container {
    color: config('colors.primary');
    padding: 0.6rem;
    display: flex;
    flex-direction: column;
    height: 100%;

    .withdraw-loader-wrapper {
      height: 100%;
      overflow-y: auto;
      padding: .5rem 0 0;
    }
    .withdraw-content {
      overflow-y: auto;
      height: 27rem;
    }
    .withdraw-title {
      font-size: config('textSizes.lg');
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
    .withdraw-sub-title {
      font-size: config('textSizes.lg');
      text-align: center;
    }
    .withdraw-item {
      margin-top: 0.9375rem;
    }
    @media screen and (max-width: 800px) {
    .withdraw-container {
      .withdraw-content {
        height: 100%;
      }
    }
  }
  }
</style>
