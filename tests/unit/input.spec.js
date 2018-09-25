import { shallowMount, createLocalVue } from '@vue/test-utils'
import Input from '@/components/Input/Input.vue'
const localVue = createLocalVue()

localVue.directive('restrict',  {})
describe('Input.vue', () => {
  it('Props.value when passed', () => {
    const value = 'Value placeholder'
    const wrapper = shallowMount(Input, { propsData: { value }, localVue })

    expect(wrapper.find('input').element.value).toMatch(value)
  })
})
