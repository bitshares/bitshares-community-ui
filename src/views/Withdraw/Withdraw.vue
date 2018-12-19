<template>
  <div class="withdraw-list">
    <div class="withdraw-sub-title">Choose token</div>
    <div class="withdraw-form">
      <div class="withdraw-loader-wrapper">
        <LoadingContainer :loading="!coinslist.length">
          <ScrollingContainer
            :empty-area="true"
            :shadower-height="12"
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
      return this.coins.filter(coin => coin.tokens)
    }
  },
  methods: {
    ...mapActions({
      setWithdrawAsset: 'withdraw/setWithdrawAsset',
      setWithdrawStep: 'withdraw/setWithdrawStep'
    }),
    selectAsset(asset) {
      this.setWithdrawAsset({ asset })
      this.setWithdrawStep('withdrawConfirmAmount')
    }
  }
}
</script>
<style lang="scss">
  .withdraw-list {
    height: 100%;
    overflow-y: auto;
  }
  .withdraw-form {
    height: 100%;
    overflow-y: auto;
  }
  .withdraw-loader-wrapper {
    height: 100%;
    overflow-y: auto;
    padding: .5rem 0 0;
  }
  .withdraw-content {
    overflow-y: auto;
    height: 19.375rem;
  }
  .withdraw-sub-title {
    font-size: config('textSizes.lg');
    text-align: center;
  }
  .withdraw-item {
    margin-top: 0.9375rem;
    min-height: 3.125rem;

    &:last-child {
      position: relative;
      z-index: 10;
    }
  }
</style>
