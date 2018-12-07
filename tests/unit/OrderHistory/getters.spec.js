import orderHistory from '@/store/modules/orderHistory'

const state = {
  searchStr: 'search'
}

test('getters:searchStr should be searchStr', () => {
  expect(
    orderHistory.getters.getSearchStr(state)
  ).toEqual(state.searchStr)
})
