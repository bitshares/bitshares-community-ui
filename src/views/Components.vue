[<template>
  <div class="components">
    This is an components page
    <Input
      v-model="number"
      type="number"
      placeholder="BTC"
    />

    <Input
      v-model="testString"
      placeholder="SEARCH"
    />
  </div>
</template>

<script>
import Input from '@/components/SimpleInput'

export default {
  name: 'Components',
  components: { Input },
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
