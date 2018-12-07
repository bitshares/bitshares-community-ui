import activeOrders from '@/store/modules/activeOrders'

const state = {
  searchStr: 'search',
  isFetching: false
}

test('getters:searchStr should be searchStr', () => {
  expect(
    activeOrders.getters.getSearchStr(state)
  ).toEqual(state.searchStr)
})

test('getters:isFetching should be isFetching', () => {
  expect(
    activeOrders.getters.isFetching(state)
  ).toEqual(state.isFetching)
})
