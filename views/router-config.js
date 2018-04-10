import Vue from 'vue'
import Router from 'vue-router'

import login from 'pages/login'
import index from 'components/layout/index'

Vue.use(Router)

export function createRouter () {
  const router = new Router({
    mode: 'history',
    routes: [
      { path: '/', component: index },
      { path: '/login', component: login }
    ]
  })

  return router
}
