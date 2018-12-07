import activeOrders from '@/store/modules/activeOrders'

const types = {
  UPDATE_SEARCH_STR: 'UPDATE_SEARCH_STR',
  UPDATE_ACTIVE_LIST: 'UPDATE_ACTIVE_LIST'
}

test('update:searchStr', () => {
  const state = {
    searchStr: 'btc'
  }
  const searchValue = 'btc'
  activeOrders.mutations[types.UPDATE_SEARCH_STR](state, searchValue)
  expect(state.searchStr).toBe(searchValue)
})

test('update:activeList', () => {
  const state = {
    activeList: []
  }
  const updateList = []
  activeOrders.mutations[types.UPDATE_ACTIVE_LIST](state, updateList)
  expect(state.activeList).toBe(updateList)
})
