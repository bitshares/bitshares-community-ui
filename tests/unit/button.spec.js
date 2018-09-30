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

  it('has a button element', () => {
    expect(wrapper.contains('button')).toBe(true)
  })

  it('emits click event when clicked', () => {
    wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })
})
