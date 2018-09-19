import { shallowMount } from '@vue/test-utils'
import Button from '@/components/Button/Button.vue'

describe('Button.vue', () => {
  it('Test click event', () => {
    const mockCallBack = jest.fn()
    const button = shallowMount((<Button onClick={mockCallBack}>Click</Button>))
    button.find('button').simulate('click')
    expect(mockCallBack.mock.calls.length).toEqual(1)
  })
})
