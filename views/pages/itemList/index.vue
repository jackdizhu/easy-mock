<template>
  <div class="em-index">
    <div class="itemList">
      itemList
    </div>
    <div class="ul-box">
      {{itemList}}
    </div>
  </div>
</template>

<style>
@import './index.css';
</style>

<script>
import * as api from '../../api'
export default {
  name: 'index',
  data () {
    return {
    }
  },
  // 该方法会在 页面加载前执行
  asyncData ({ store, route }) {
    let _li = store.itemList
    // return store.dispatch('itemList/SET_VALUE', _li)
    api.item.getList({
      params: {
        key: _li
      }
    }).then((res) => {
      if (res.data.success) {
        store.commit('itemList/SET_VALUE', res.data.data || {})
        return res.data.data
      }
    })
    // store.commit('itemList/SET_VALUE')
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
