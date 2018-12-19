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

test('helpers: getFloatCurrency should be value when digits > 8', () => {
  expect(getFloatCurrency(100.12345678)).toBe('100.12345')
})

test('helpers: getFloatCurrency should be without first 0, and 8 digit after', () => {
  expect(getFloatCurrency(0.12345678)).toBe('.12345678')
})

test('helpers: getFloatCurrency should be with first 0, and all digits when length < 8', () => {
  expect(getFloatCurrency(0.12345)).toBe('0.12345')
})

test('helpers: getFloatCurrency should be with first 0, and digits when length > 8 and has 0', () => {
  expect(getFloatCurrency(0.12345000)).toBe('0.12345')
})

test('helpers: getFloatCurrency should be value with last 0 and no float point', () => {
  expect(getFloatCurrency(50)).toBe('50')
})

test('helpers: getFloatCurrency should be value with pretty format', () => {
  expect(getFloatCurrency(5000)).toBe('5 000')
})

test('helpers: getFloatCurrency should be value with pretty format and float point', () => {
  expect(getFloatCurrency(50000.12332)).toBe('50 000.12332')
})
