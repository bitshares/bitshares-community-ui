<template>
  <div>
    <LoadingContainer :loading="pending">
      <div
        v-show="error || !filteredOperations.length && !pending">
        <div
          v-show="!filteredOperations.length && !pending">
          No transactions yet
        </div>
        <div
          v-show="error">
          Error when fetching user's transactions
        </div>
      </div>
      <TransactionsItem
        v-for="item in filteredOperations"
        :item="item"
        :key="item.id"
        :user-id="userId"/>
    </LoadingContainer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TransactionsItem from './TransactionsItem'
import Loader from '@/components/Loader'
import LoadingContainer from '@/components/LoadingContainer'

export default {
  components: {
    TransactionsItem,
    Loader,
    LoadingContainer
  },
  props: {
    limit: {
      type: Number,
      required: false,
      default: 100
    }
  },
  computed: {
    ...mapGetters({
      userId: 'acc/getAccountUserId',
      operations: 'operations/getOperations',
      pending: 'operations/isFetching',
      error: 'operations/isError'
    }),
    sortedOperations() {
      return this.operations.slice().sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return dateB - dateA
      })
    },
    filteredOperations() {
      if (!this.userId) return []
      if (this.limit) return this.sortedOperations.slice(0, this.limit)
      return this.sortedOperations
    }
  },
  page: {
    title: 'History'
  }
}
</script>
