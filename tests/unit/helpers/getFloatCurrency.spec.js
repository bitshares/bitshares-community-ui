import { getFloatCurrency } from '@/helpers/utils'

test('helpers: getFloatCurrency should be normal value with number', () => {
  expect(getFloatCurrency(100.56)).toBe('100.56')
})

test('helpers: getFloatCurrency should be normal value with string', () => {
  expect(getFloatCurrency('100.56')).toBe('100.56')
})

test('helpers: getFloatCurrency should be without 0', () => {
  expect(getFloatCurrency(100.56000000)).toBe('100.56')
})

test('helpers: getFloatCurrency should be without first 0, and slice 3 digit after point', () => {
  expect(getFloatCurrency(0.12345678)).toBe('0.123')
})

test('helpers: getFloatCurrency should be value with last 0 and no float point', () => {
  expect(getFloatCurrency(50)).toBe('50')
})

test('helpers: getFloatCurrency should be value with pretty format', () => {
  expect(getFloatCurrency(5000)).toBe('5 000')
})

test('helpers: getFloatCurrency should be value with pretty format and float point', () => {
  expect(getFloatCurrency(50000.12332)).toBe('50 000.12')
})
