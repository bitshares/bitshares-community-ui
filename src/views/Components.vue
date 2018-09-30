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
      <Input value="test input"/>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button/'
import Input from '@/components/Input/'
import Tabs from '@/components/Tabs/'

export default {
  name: 'Components',
  components: { Button, Input, Tabs }
}
</script>
