<template>
  <p class="_value">
    {{ transferType }} {{ amount }} {{ assetName }} {{ otherUserVerb }} {{ otherUserName }}
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
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      getAssetById: 'assets/getAssetById'
    }),
    userIsSender() {
      return this.item.payload.from === this.userId
    },
    transferType() {
      return this.userIsSender ? 'Sent' : 'Received'
    },
    amount() {
      const amount =
        this.item.payload.amount.amount / 10 ** this.asset.precision
      return amount.toFixed(8).replace(/\.?0+$/, '')
    },
    asset() {
      return this.getAssetById(this.item.payload.amount.asset_id)
    },
    assetName() {
      return this.asset && this.asset.symbol
    },
    otherUserVerb() {
      return this.userIsSender ? 'to' : 'from'
    },
    otherUserName() {
      return this.item.otherUserName
    }
  }
}
</script>
