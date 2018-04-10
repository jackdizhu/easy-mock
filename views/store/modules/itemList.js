import * as api from '../../api'
export default {
  namespaced: true,
  mutations: {
    SET_VALUE (state, payload) {
      state.id = payload._id
      state.name = payload.name
      state.nickName = payload.nick_name
      state.email = payload.email
      state.headImg = payload.head_img
      state.token = payload.token
    }
  },
  actions: {
    SET_VALUE ({ commit, state }) {
      return api.item.getList({
        params: {
          key: 'val'
        }
      }).then((res) => {
        if (res.data.success) {
          commit('SET_VALUE', res.data.data)
          return res.data.data
        }
      })
    }
  }
}
