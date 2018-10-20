[<template>
  <div class="components">
    This is an components page
    <div>
      <Card
        :title="'Test Title'">
        <div slot="header">
          <Button
            text="button test"
            size="medium"
          />
        </div>
        <div slot="body">
          <Button
            text="button test"
            size="big"
          />
        </div>
      </Card>
    </div>
    <div>
      <Tabs
        :centered="true"
        :tabs="['Tab example #1 with the responsive width', 'Tab example #2 with the responsive width', 'Tab example #3 with the responsive width']">
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
      <Button
        text="button test"
        size="small"/>
    </div>
    <MobileFooter
      :items="['Test #1', 'Test #2', 'Test #3']"
    />
  </div>
</template>

<script>
import Button from '@/components/Button/'
import Tabs from '@/components/Tabs/'
import Card from '@/components/Card'
import MobileFooter from '@/components/MobileFooter'

export default {
  name: 'Components',
  components: { Button, Tabs, Card, MobileFooter },
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
