'use strict'

// const config = require('config')
const Router = require('koa-router')
// const restc = require('restc').koa2()
const {
  user
} = require('./controllers')
// const middleware = require('./middlewares')

const apiRouter = new Router({ prefix: '/api' })
// const mockRouter = new Router({ prefix: '/mock' })

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

// exports.mock = mockRouter
//   .all('*', middleware.mockFilter, rate, restc, mock.getMockAPI)

exports.api = apiRouter

  .get('/u', user.list)
  .post('/u/login', user.login)
