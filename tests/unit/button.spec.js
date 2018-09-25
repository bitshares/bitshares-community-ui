import { shallowMount, mount } from '@vue/test-utils'
import Button from '@/components/Button/Button.vue'

describe('Button.vue', () => {
  const wrapper = mount(Button)

  it('renders props.text when passed', () => {
    const text = ''
    const wrapper = shallowMount(Button, {
      propsData: { text }
    })
    expect(wrapper.text()).toMatch(text)
  })

  it('renders props.loading when passed', () => {
    const wrapper = mount(Button)
    expect(wrapper.find('loading'))
  })

  it('renders props.disabled when passed', () => {
    const wrapper = mount(Button)
    expect(wrapper.find('disabled'))
  })

  it('has a button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })

  wrapper.vm.$emit('click')

  it('emits click event', () => {
    expect(wrapper.emitted().click).toBeTruthy()
  })
})
