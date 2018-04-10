import Vue from 'vue'
import Vuex from 'vuex'

import { version } from '../../package.json'
import user from './modules/user'
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
      user: {
        state: {
          id: '',
          name: '',
          nickName: '',
          email: '',
          headImg: '',
          token: ''
        },
        ...user
      }
    }
  })
}
