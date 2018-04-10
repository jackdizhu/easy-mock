import Vue from 'vue'
import Vuex from 'vuex'

import { version } from '../../package.json'
import itemList from './modules/itemList'
import app from './modules/app'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    modules: {
      app: {
        state: {
          version: version,
          readChangelog: false
        },
        ...app
      },
      itemList: {
        state: {
          id: '',
          name: '',
          nickName: '',
          email: '',
          headImg: '',
          token: ''
        },
        ...itemList
      }
    }
  })
}
