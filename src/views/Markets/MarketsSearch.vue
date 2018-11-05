<template>
  <SearchInput
    hint="Search"
    @input="changeSearchStr"
  />
</template>

<script>
import { mapActions } from 'vuex'
import SearchInput from '@/components/SearchInput'

export default {
  components: {
    SearchInput
  },
  methods: {
    ...mapActions('marketsMonitor', ['changeSearchStr'])
  }
}
</script>
