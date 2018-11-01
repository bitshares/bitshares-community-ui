import { amountValueShortener } from '@/helpers/utils'

describe('amountValueShortener function', () => {
  it('Test amount shortener used with 100', () => {
    const amount = '100'
    const finalAmount = '100'
    const result = amountValueShortener(amount)
    expect(result).toBe(finalAmount)
  })
      
  it('Test amount shortener with thousands', () => {
    const amount = '12000'
    const finalAmount = '12k'
    const result = amountValueShortener(amount)
    expect(result).toBe(finalAmount)
  })

  it('Test amount shortener with millions', () => {
    const amount = '12000000'
    const finalAmount = '12m'
    const result = amountValueShortener(amount)
    expect(result).toBe(finalAmount)
  })


})
