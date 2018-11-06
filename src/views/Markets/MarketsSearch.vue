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
      searchStr: 'marketsMonitor/getSearchStr'
    })
  },
  methods: {
    ...mapActions('marketsMonitor', ['changeSearchStr'])
  }
}
</script>
