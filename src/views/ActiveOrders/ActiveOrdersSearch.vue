<template>
  <SearchInput
    hint="Search"
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
      searchStr: 'activeOrders/getSearchStr'
    })
  },
  methods: {
    ...mapActions('activeOrders', ['changeSearchStr'])
  }
}
</script>
