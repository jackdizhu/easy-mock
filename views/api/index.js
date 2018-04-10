import axios from 'axios'
import iView from 'iview'
import conf from 'config'
import Cookies from 'universal-cookie'
import { serverCookies } from '../entry/server'

let router
const cookies = new Cookies()
const isClient = process.env.VUE_ENV === 'client'
const instance = axios.create({
  baseURL: isClient ? '/api' : `http://${conf.host}:${conf.port}/api`,
  timeout: conf.timeout
})

const loading = {
  count: 0,
  isLoading: false,
  start () {
    this.count += 1
    if (!this.isLoading) {
      setTimeout(() => {
        if (!this.isLoading && this.count > 0) {
          this.isLoading = true
          this.checkLoading()
        }
      }, 1000)
    }
  },
  cancel () {
    this.count -= 1
    if (this.count <= 0) {
      this.done()
    }
  },
  done () {
    this.count = 0
    this.isLoading = false
    iView.LoadingBar.finish()
  },
  checkLoading () {
    const el = document.querySelector('.ivu-loading-bar')
    if (this.isLoading && !el) {
      iView.LoadingBar.start()
    }
  }
}

instance.interceptors.request.use((config) => {
  let token
  if (isClient) {
    loading.start()
    token = cookies.get(conf.storageNamespace + 'token')
  } else {
    token = serverCookies.get(conf.storageNamespace + 'token')
  }
  config.headers.Authorization = `Bearer ${token}`
  return config
}, error => Promise.reject(error))

instance.interceptors.response.use((res) => {
  const messageUnless = res.config.messageUnless || []
  const body = res.data

  if (isClient) loading.cancel()
  if (body.success === false) {
    if (body.code === 10001) {
      body.data.forEach((date) => {
        iView.Notice.error({
          title: 'Error',
          desc: date[Object.keys(date)[0]]
        })
      })
    } else if (messageUnless.indexOf(body.message) === -1) {
      iView.Notice.error({
        title: 'Error',
        desc: body.message
      })
    }
    return Promise.reject(res)
  }
  return res
}, (error) => {
  const res = error.response
  if (isClient) loading.cancel()
  if (res) {
    if (res.status === 401 && /authentication/i.test(res.data.error)) {
      if (isClient) {
        router.push('/log-out')
      } else {
        return Promise.reject({ code: 401 }) // eslint-disable-line
      }
    } else if (isClient && res.data && res.data.error) {
      iView.Notice.error({
        title: 'Error',
        desc: res.data.error
      })
    }
  }
  Promise.reject(error)
})

const initAPI = _router => (router = _router)
const createAPI = (url, method, config) => {
  config = config || {}
  return instance({
    url,
    method,
    ...config
  })
}

const item = {
  getList: config => createAPI('/item_getList', 'get', config)
}

export {
  item,
  initAPI
}
