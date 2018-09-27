[<template>
  <div class="components">
    This is an components page
    <div>
      <Button
        text="button test"
        size="small"/>
    </div>
    <div>
      <VInput
        v-model="testString"
        title="create account name"
        icon="copy"/>
      <VInput
        v-model="errorMsg"
        title="generated password"/>
      <VInput
        v-model="number"
        type="number"
        title="number only input"/>
      <VInput
        v-model="testString"
        :disabled="true"
        title="title"/>
      <VInput
        v-model="testString"
        :error="errorMsg"
        title="username"/>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button/'
import VInput from '@/components/Input/'

export default {
  name: 'Components',
  components: { Button, VInput },
  data() {
    return {
      testString: 'wef',
      errorMsg: '234',
      configMsg: '',
      number: 43
    }
  }
}
</script>

