import { shallowMount, createLocalVue } from '@vue/test-utils'
import Input from '@/components/Input/Input.vue'
import Vuelidate from 'vuelidate'
const localVue = createLocalVue()
localVue.directive('restrict', {})
localVue.use(Vuelidate)

describe('Input.vue', () => {
  it('Props.value set inputs value', () => {
    const value = 'Value placeholder'
    const wrapper = shallowMount(Input, { propsData: { value, errors: {}, inputName: 'userName' }, localVue })

    expect(wrapper.find('input').element.value).toMatch(value)
  })

  it('Props.disabled disables input', () => {
    const disabled = true
    const wrapper = shallowMount(Input, { propsData: { disabled, errors: {}, inputName: 'userName' }, localVue })

    expect(wrapper.find('input').element.disabled).toBe(disabled)
  })

  it('Props.title displays title', () => {
    const title = 'test title'
    const wrapper = shallowMount(Input, { propsData: { title, errors: {}, inputName: 'userName' }, localVue })

    expect(wrapper.find('.input__title').isVisible()).toBe(true)
    expect(wrapper.find('.input__title').html()).toMatch(title)
  })
})
