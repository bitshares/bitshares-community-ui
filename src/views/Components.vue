[<template>
  <div class="components">
    This is an components page
    <SInput
      v-model="number"
      type="number"
      placeholder="BTC"
    />

    <SInput
      v-model="testString"
      placeholder="SEARCH"
    />
  </div>
</template>

<script>
import SInput from '@/components/SimpleInput'

export default {
  name: 'Components',
  components: { SInput },
  data() {
    return {
      testString: '',
      errorMsg: '',
      configMsg: '',
      number: 43
    }
  }
}
</script>

<style>
  .components {
    padding: 10px;
  }
</style>