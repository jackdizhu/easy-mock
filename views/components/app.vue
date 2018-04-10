<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// import languageMap from '../locale/map'

export default {
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style>

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 10px;
}
</style>

