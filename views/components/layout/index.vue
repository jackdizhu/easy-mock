<template>
  <div class="em-layout">
    index
    <p>
      <router-link to="/itemList" class="link">itemList</router-link>
    </p>
  </div>
</template>

<style>
@import './index.css';
</style>

<script>
// import config from 'config'
import Emitter from '../../mixins/emitter'

export default {
  name: 'EmLayout',
  mixins: [Emitter],
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  watch: {
  },
  methods: {
  }
}
</script>
