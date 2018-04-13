import Vue from 'vue'
import Vuex from 'vuex'

import itemList from './modules/itemList'
import app from './modules/app'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    modules: {
      app: {
        ...app
      },
      itemList: {
        ...itemList
      }
    }
  })
}
