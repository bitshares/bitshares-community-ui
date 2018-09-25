[<template>
  <div class="components">
    This is an components page
    <div>
      <Button text="button test" size="small" loading disabled/>
    </div>
    <div>
      <Input v-model="testString" title="create account name" icon="copy"/>
      <Input v-model="errorMsg" title="generated password"/>
      <Input v-model="configMsg" title="confirm password"/>
      <Input v-model="testString" :disabled="true" title="title"/>
      <Input v-model="testString" title="username" :error="errorMsg"/>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button/'
import Input from '@/components/Input/'

export default {
  name: 'Components',
  components: { Button, Input },
  data() {
    return {
      testString: 'wef',
      errorMsg: '234',
      configMsg: ''
    }
  }
}
</script>
]
