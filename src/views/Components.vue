<template>
  <div class="components">
    This is an components page
    <div>
      <Button text="test button"/>
    </div>
    <div>
      <Input v-model="testString" title="title"/>
      <Input v-model="testString" :disabled="true" title="title"/>
      <Input v-model="testString" title="username" :error="errorMsg"/>
      <Input v-model="errorMsg" title="confirm password"/>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button/'
import Input from '@/components/Input/'

export default {
  name: 'Components',
  components: { Button, Input },
  data () {
    return {
      testString: 'wef',
      errorMsg: '234'
    }
  }
}
</script>
