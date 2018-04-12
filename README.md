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
