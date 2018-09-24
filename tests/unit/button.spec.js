import { shallowMount, mount } from '@vue/test-utils'
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

describe('Button.vue', () => {
  it('renders props.isDisabled when passed', () => {
    const disabled = ''
    const wrapper = shallowMount(Button, {
      propsData: { disabled }
    })
    expect(wrapper.text()).toMatch(disabled)
  })
})

describe('Button.vue', () => {
  it('renders props.isLoading when passed', () => {
    const loading = ''
    const wrapper = shallowMount(Button, {
      propsData: { loading }
    })
    expect(wrapper.text()).toMatch(loading)
  })
})


describe('Button.vue', () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(Button)
  
  it('has a button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })
})
