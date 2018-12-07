import orderHistory from '@/store/modules/orderHistory'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    orderHistory
  }
})

const initialState = JSON.parse(JSON.stringify(store.state))

describe('orderHistory module: actions', () => {
  beforeEach(() => {
    store.replaceState(JSON.parse(JSON.stringify(initialState)))
  })

  it('changeSearchStr', async done => {
    await store.commit('orderHistory/UPDATE_SEARCH_STR', 'search')
    expect(store.state.orderHistory.searchStr).toBe('search')
    done()
  })
})
