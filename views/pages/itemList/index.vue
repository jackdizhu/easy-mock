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
export default {
  name: 'index',
  data () {
    return {
    }
  },
  // 该方法会在 页面加载前执行
  asyncData ({ store, route }) {
    store.commit('itemList/SET_VALUE')
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
