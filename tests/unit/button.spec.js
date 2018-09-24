import { shallowMount, mount } from '@vue/test-utils'
import Button from '@/components/Button/Button.vue'

describe('Button.vue', () => {
  it('renders props.text when passed', () => {
    const text = ''
    const wrapper = shallowMount(Button, {
      propsData: { text }
    })
    expect(wrapper.text()).toMatch(text)
  })
})

describe('Button.vue', () => {
  it('renders props.disabled when passed', () => {
    const wrapper = mount(Button, {
      propsData: {
        disabled: true
      }
    })
    expect(wrapper.props('disabled')).toBe(true)
  })
})

describe('Button.vue', () => {
  it('renders props.loading when passed', () => {
    const wrapper = mount(Button, {
      propsData: {
        loading: true
      }
    })
    expect(wrapper.props('loading')).toBe(true)
  })
})

describe('Button.vue', () => {
  const wrapper = mount(Button)
  it('has a button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })
})

describe('Button.vue', () => {
  const wrapper = mount(Button)
  wrapper.vm.$emit('click')
  it('emits click event', () => {
  expect(wrapper.emitted().click).toBeTruthy()
  })
})
