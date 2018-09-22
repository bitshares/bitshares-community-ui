import { shallowMount } from '@vue/test-utils'
import Button from '@/components/Button/Button.vue'

describe('Button.vue', () => {
  it('renders props.text when passed', () => {
    const text = 'test the button'
    const wrapper = shallowMount(Button, {
      propsData: { text }
    })
    expect(wrapper.text()).toMatch(text)
  })
})
