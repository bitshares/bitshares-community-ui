import orderBook from '@/store/modules/orderBook'

const state = {
  lastPrice: null,
  baseAsset: null,
  quoteAsset: null,
  fetching: false,
  orderBook: {
    buying: [],
    selling: []
  },
  lastOrder: null
}

test('getters:lastPrice should be lastPrice', () => {
  expect(
    orderBook.getters.getLastPrice(state)
  ).toEqual(state.lastPrice)
})

test('getters:baseAsset should be baseAsset', () => {
  expect(
    orderBook.getters.getBaseAsset(state)
  ).toEqual(state.baseAsset)
})

test('getters:quoteAsset should be quoteAsset', () => {
  expect(
    orderBook.getters.getQuoteAsset(state)
  ).toEqual(state.quoteAsset)
})

test('getters:fetching should be fetching', () => {
  expect(
    orderBook.getters.isFetching(state)
  ).toEqual(state.fetching)
})

test('getters:lastOrder should be lastOrder', () => {
  expect(
    orderBook.getters.getLastOrder(state)
  ).toEqual(state.lastOrder)
})

test('getters:orderBook should be orderBook', () => {
  expect(
    orderBook.getters.getOrderBook(state)
  ).toEqual(state.orderBook)
})
