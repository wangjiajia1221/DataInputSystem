<template>
  <div id="app">
    <div class="left-container">
      <nav-menu></nav-menu>
    </div>
    <div class="right-container">
      <router-view class="view"></router-view>
      <ul>
        <li><a href="/first">first page</a></li>
        <li><a href="/second">second page</a></li>
        <li><a href="/third">third page</a></li>
      </ul>
      <img src="./assets/logo.png">
      <h1>{{ msg }}</h1>
    </div>
  </div>
</template>

<script>
import navMenu from './menu.vue'
export default {
  name: 'app',
  components: {
    navMenu
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  position: relative;
  min-height: 100%;
  .left-container {
    position: relative;
    z-index: 99;
  }
  .right-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 1080px;
    position: relative;
  }
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}
</style>
