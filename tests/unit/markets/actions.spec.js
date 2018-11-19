import markets from '@/store/modules/marketsMonitor'
import { createLocalVue } from 'vue-test-utils';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    markets
  }
});

const initialState = JSON.parse(JSON.stringify(store.state));

describe('markets module: actions', () => {
  beforeEach(() => {
    store.replaceState(JSON.parse(JSON.stringify(initialState)));
  });

  it('changed searchStr', async done => {
    await store.commit('markets/UPDATE_SEARCH_STR', 'find');

    expect(store.state.markets.searchStr).toBe('find');
    done();
  });
});
