[<template>
  <div class="components">
    This is an components page
    <div>
      <Tabs :centered=true :active="['Tab example #1 with the responsive width']" :tabs="['Tab example #1 with the responsive width', 'Tab example #2 with the responsive width', 'Tab example #3 with the responsive width']">
      <div slot="Tab example #1 with the responsive width">
        <!-- Stuff. -->1
      </div>

      <div slot="Tab example #2 with the responsive width">
        <!-- Stuff. -->2
      </div>

      <div slot="Tab example #3 with the responsive width">
        <!-- Stuff.-->3
      </div>
      </Tabs>
      <Button text="button test" size="small" loading disabled/>
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
import Tabs from '@/components/Tabs/'

export default {
  name: 'Components',
  components: { Button, Input, Tabs }
}
</script>
