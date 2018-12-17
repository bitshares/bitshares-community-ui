const types = {
  UPDATE_GRAPH_ITEMS: 'UPDATE_GRAPH_ITEMS'
}

const getInitialState = () => ({
  graphItems: [],
  titles: []
})

const getters = {
  getTitles: (state) => {
    const items = []
    for (let i = 0; i < 10; i++) {
      items.push(`${i}:00`)
    }
    return items
  },
  getGraphItems: (state) => {
    const items = []
    for (let i = 0; i < 20; i++) {
      items.push(Math.round((Math.random() * 5) + 3294))
    }
    items[0] = 3300
    items[items.length - 1] = 3287
    return items
  }
}

const mutations = {
  [types.UPDATE_GRAPH_ITEMS](state, items) {
    state.graphItems = items
  }
}

const actions = {
  updateGraphItems({ commit }, items) {
    commit(types.UPDATE_GRAPH_ITEMS, items)
  }
}

export default {
  namespaced: true,
  state: getInitialState(),
  mutations,
  actions,
  getters
}
