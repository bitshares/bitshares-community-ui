import markets from '@/store/modules/marketsMonitor'

const types = {
  UPDATE_FAVOURITES: 'UPDATE_FAVOURITES',
  UPDATE_CURRENT_BASE: 'UPDATE_CURRENT_BASE',
  UPDATE_SEARCH_STR: 'UPDATE_SEARCH_STR'
}

test('update:favourites', () => {
  const state = {
    favourites: {}
  }
  const favourites = {}
  markets.mutations[types.UPDATE_FAVOURITES](state, { favourites })
  expect(state.favourites).toBe(favourites)
})

test('update:currentBase', () => {
  const state = {
    currentBase: 'USD'
  }
  const currentBase = 'USD'
  markets.mutations[types.UPDATE_FAVOURITES](state, currentBase)
  expect(state.currentBase).toBe(currentBase)
})

test('update:searchStr', () => {
  const state = {
    searchStr: ''
  }
  let searchStr = ''
  markets.mutations[types.UPDATE_FAVOURITES](state, searchStr)
  expect(state.searchStr).toBe(searchStr)
})
