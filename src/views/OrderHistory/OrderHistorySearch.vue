<template>
  <SearchInput
    :value="searchStr"
    hint="Search"
    class="order-history-search"
    @input="changeSearchStr"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SearchInput from '@/components/SearchInput'

export default {
  components: {
    SearchInput
  },
  computed: {
    ...mapGetters({
      searchStr: 'orderHistory/getSearchStr'
    })
  },
  methods: {
    ...mapActions('orderHistory', ['changeSearchStr'])
  }
}
</script>
<style lang="scss">
  .order-history-search {
    transform: scale(1.2, 1.2);
    margin: -0.625rem 0.525rem 0 0
  }
</style>
