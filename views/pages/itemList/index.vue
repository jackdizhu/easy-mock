<template>
  <div class="em-index">
    <div class="login">
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
