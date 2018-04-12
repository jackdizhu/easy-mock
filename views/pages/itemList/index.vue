<template>
  <div class="em-index">
    <div class="itemList">
      itemList
    </div>
    <div class="ul-box">
      {{itemList}}
    </div>
    <!-- <div class="ul-box">
      {{_itemList}}
    </div> -->
  </div>
</template>

<style>
@import './index.css';
</style>

<script>
import * as api from '../../api'
let _itemList = {}
export default {
  name: 'index',
  data () {
    return {
      _itemList: _itemList || {}
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
  },
  mounted () {
  },
  computed: {
    itemList () {
      return this.$store.state.itemList
    }
  },
  watch: {
  },
  methods: {
  }
}
</script>
