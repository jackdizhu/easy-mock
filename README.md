# koa2 vue ssr demo

* 基于koa2 的vue ssr 方案
* 通过 to 页面 asyncData 方法提前获取下一页面 的数据

``` js
// [Vue warn]: Property or method "_itemList" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property
// data 数据不能以 _ 下划线开头
let _itemList = {}
export default {
  name: 'index',
  data () {
    return {
      list: _itemList || {}
    }
  },
  computed: {
    itemList () {
      return this.$store.state.itemList
    }
  },
  // 该方法会在 页面加载前执行
  asyncData ({ store, route, _this }) {
    let _li = store.itemList
    api.item.getList({
      params: {
        key: _li
      }
    }).then((res) => {
      if (res.data.success) {
        // 通过 store.commit 保存到vuex 共享数据
        store.commit('itemList/SET_VALUE', res.data.data || {})
        // 通过 _itemList 方式 将数据放在当前组件
        _itemList = res.data.data || {}
        return res.data.data
      }
    })
  }
}
```

## asyncData 方法修改 刷新页面没有数据问题

``` js
asyncData ({ store, route, _this, callBack }) {
  return new Promise((resolve, reject) => {
    let _li = store.itemList
    api.item.getList({
      params: {
        key: _li
      }
    }).then((res) => {
      if (res && res.data && res.success) {
        // 通过 store.commit 保存到vuex 共享数据
        store.commit('itemList/SET_VALUE', res.data || {})
        // 通过 list 方式 将数据放在当前组件
        _itemList = res.data || {}

        console.log(_itemList, 'itemList --> index.vue asyncData')

        callBack && callBack()
        resolve(res.data)
        return res.data
      } else {
        resolve({})
        return {}
      }
    })
  })
}
// 页面刷新 显示数据后 300ms后数据为空 待排查 ( 页面存在多组件时 子组件 数据不能显示 )
let _itemList = {}
data () {
  return {
    list: _itemList || {}
  }
}
// store 开启 namespaced 命名空间 'itemList' 第一个字符串参数 是命名空间
computed: {
  ...mapGetters('itemList', [
    'getItemId'
  ]),
  ...mapState([
    'itemList'
  ]),
  itemListfn () {
    return this.$store.state.itemList
  }
}
```
