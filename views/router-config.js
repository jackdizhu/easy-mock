import Vue from 'vue'
import Router from 'vue-router'

import itemList from 'pages/itemList'
import index from 'components/layout/index'

Vue.use(Router)

export function createRouter () {
  const router = new Router({
    mode: 'history',
    routes: [
      { path: '/', component: index },
      { path: '/itemList', component: itemList }
    ]
  })

  return router
}
