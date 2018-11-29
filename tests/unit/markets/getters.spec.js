import markets from '@/store/modules/marketsMonitor'

const state = {
  currentBase: 'USD',
  searchStr: '',
  favourites: {
    USD: [
      'BTS',
      'BTC'
    ]
  }
}

test('getters:favouritesCount should be favourites count', () => {
  expect(
    markets.getters.favouritesCount(state)
  ).toBe(2)
})

test('getters:isTickerFavourite should be true', () => {
  expect(
    markets.getters.isTickerFavourite(state)('USD', 'BTC')
  ).toBe(true)
})

test('getters:isTickerFavourite should be false', () => {
  expect(
    markets.getters.isTickerFavourite(state)('USD', 'ETH')
  ).toBe(false)
})

test('getters:getCurrentBase should be USD', () => {
  expect(
    markets.getters.getCurrentBase(state)
  ).toBe('USD')
})

test('getters:getFavourites should be favourites', () => {
  expect(
    markets.getters.getFavourites(state)
  ).toEqual(state.favourites)
})

test('getters:getSearchStr should be searchStr', () => {
  expect(
    markets.getters.getSearchStr(state)
  ).toEqual(state.searchStr)
})
