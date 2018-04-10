'use strict'

// const config = require('config')
const Router = require('koa-router')
// const restc = require('restc').koa2()
const {
  user
} = require('./controllers')
// const middleware = require('./middlewares')

const apiRouter = new Router({ prefix: '/api' })
const mockRouter = new Router({ prefix: '/mock' })

// const ratelimit = require('koa-ratelimit')
// const baseUtil = require('./util')
// const rateLimitConf = config.get('rateLimit')
// const rate = ratelimit({
//   db: baseUtil.getRedis(),
//   id: ctx => ctx.url,
//   max: rateLimitConf.max,
//   duration: rateLimitConf.duration,
//   errorMessage: 'Sometimes You Just Have to Slow Down.',
//   headers: {
//     remaining: 'Rate-Limit-Remaining',
//     reset: 'Rate-Limit-Reset',
//     total: 'Rate-Limit-Total'
//   }
// })

exports.mock = mockRouter
  .all('*', function (ctx) {
    ctx.body = {
      'title': 'login',
      'res_code': '0',
      'msg': '登录成功.',
      'success': true,
      'data': {
        '_id': '5aa880ecdfd6d80818050d81',
        'ext': {
          'nick_name': 'nick_name',
          'head_img': 'head_img'
        },
        'phone': '13010101212',
        'email': '130@qq.com',
        'date': new Date().getTime(),
        'password': '',
        'name': 'jack',
        '__v': 0
      },
      'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiamFjayIsImlhdCI6MTUyMjA1NDAyMCwiZXhwIjoxNTIyMDU3NjIwfQ.v2dr_RcvWLv5jtpOvp0U_zHDkyYsxSG74HEzgmgeio0',
      'get': {},
      'post': {}
    }
  })

exports.api = apiRouter

  .get('/u', user.list)
  .post('/u/login', user.login)
