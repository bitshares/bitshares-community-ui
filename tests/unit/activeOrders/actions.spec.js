import activeOrders from '@/store/modules/activeOrders'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    activeOrders
  }
})

const initialState = JSON.parse(JSON.stringify(store.state))

describe('activeOrders module: actions', () => {
  beforeEach(() => {
    store.replaceState(JSON.parse(JSON.stringify(initialState)))
  })

  it('changeSearchStr', async done => {
    await store.commit('activeOrders/UPDATE_SEARCH_STR', 'search')
    expect(store.state.activeOrders.searchStr).toBe('search')
    done()
  })

  it('removeActiveOrder', async done => {
    const list = [1, 2, 3]
    await store.commit('activeOrders/UPDATE_ACTIVE_LIST', list)
    expect(store.state.activeOrders.activeList).toEqual(list)
    done()
  })
})
