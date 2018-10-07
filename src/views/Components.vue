[<template>
  <div class="components">
    This is an components page
    <div>
      <Card
        :title="'Test title'">
        <div slot="header">Awesome card</div>
        <div slot="body">
          <h5>Some great content</h5>
          <p>Another great line of some content</p>
        </div>
      </Card>
    </div>
    <div>
      <Button
        text="button test"
        size="small"
        loading
        disabled/>
    </div>
    <div>
      <VInput
        v-model="testString"
        title="create account name"
        icon="copy"/>
      <VInput
        v-model="errorMsg"
        type="password"
        title="password"/>
      <VInput
        v-model="number"
        type="number"
        title="number only input"/>
      <VInput
        v-model="testString"
        :disabled="true"
        title="disabled input"/>
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
import Card from '@/components/Card'

export default {
  name: 'Components',
  components: { Button, VInput, Card },
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
]
