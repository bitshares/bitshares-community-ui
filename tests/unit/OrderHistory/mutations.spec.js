import orderHistory from '@/store/modules/orderHistory'

const types = {
  UPDATE_SEARCH_STR: 'UPDATE_SEARCH_STR'
}

test('update:searchStr', () => {
  const state = {
    searchStr: 'btc'
  }
  const searchValue = 'btc'
  orderHistory.mutations[types.UPDATE_SEARCH_STR](state, searchValue)
  expect(state.searchStr).toBe(searchValue)
})
