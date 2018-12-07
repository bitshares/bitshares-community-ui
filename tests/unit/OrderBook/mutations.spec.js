import orderBook from '@/store/modules/orderBook'

const types = {
  ORDER_BOOK_INIT_START: 'ORDER_BOOK_INIT_START',
  ORDER_BOOK_RESET: 'ORDER_BOOK_RESET'
}

test('update:ORDER_BOOK_INIT_START', () => {
  const state = {
    baseAsset: 'BTC',
    quoteAsset: 'USD',
    fetching: true
  }

  const baseAsset = 'BTC'
  const quoteAsset = 'USD'
  const fetching = true

  orderBook.mutations[types.ORDER_BOOK_INIT_START](state, { baseAsset, quoteAsset, fetching })
  expect(state).toEqual({ baseAsset, quoteAsset, fetching })
})

test('update:ORDER_BOOK_RESET', () => {
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

  orderBook.mutations[types.ORDER_BOOK_RESET](state)
  expect(state).toEqual(state)
})
