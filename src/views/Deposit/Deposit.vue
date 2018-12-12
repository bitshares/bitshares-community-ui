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
    <!--<Button
      class="example-button"
      text="example button"/>-->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Button from '@/components/Button'
import ScrollingContainer from '@/components/ScrollingContainer'
import SimpleInput from '@/components/SimpleInput'

export default {
  components: {
    Button,
    ScrollingContainer,
    SimpleInput
  },
  data() {
    return {
      searchStr: '',
      list: [
        '32BIT (32bit)',
        '8BIT (8Bit)',
        'ANTI (AntiBitcoin)',
        'bifd (bifd)',
        'BIGUP (BigUp)',
        'bill (bill)',
        'BITB (BitBean)'
      ]
    }
  },
  computed: {
    filteredList() {
      if (!this.searchStr) return this.list
      return this.list.filter(deposit => deposit.indexOf(this.searchStr) > -1)
    }
  },
  methods: {
    ...mapActions({
      toggleAddressScreen: 'deposit/toggleAddressScreen'
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
    height: 100%;
    overflow: hidden;
    min-height: 480px;

    .deposit-content {
      height: 100%;
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
