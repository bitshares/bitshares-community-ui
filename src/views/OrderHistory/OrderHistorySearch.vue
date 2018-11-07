<template>
  <SearchInput
    :value="searchStr"
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
      searchStr: 'orderHistory/getSearchStr'
    })
  },
  methods: {
    ...mapActions('orderHistory', ['changeSearchStr'])
  }
}
</script>
