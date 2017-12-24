<template>
  <div id="app">
    <div class="left-container">
      <nav-menu></nav-menu>
    </div>
    <div class="right-container">
      <div style="text-align: right;margin: 10px 30px 0 0;"><el-button type="text" @click="logout">退出</el-button></div>
      <router-view class="view"></router-view>
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
  },
  methods: {
    logout() {
      window.location.href='/logout';
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
    .el-card {
      color: #9c9c9c;
      font-size: 14px;
    }
    .top-add {
      height:50px;
      line-height:50px;
      text-align:left;
      padding-left:20px;
    }
    .top-container {
      line-height: 50px;
      .el-tag {
        position: relative;
        font-size: 20px;
        letter-spacing: 8px;
      }
    }
    .el-dialog {
      width: 60%;
      .el-form-item{
        margin-left: 30px;
        .el-form-item__content {
          text-align: left;
          margin-left: 150px;
        }
        .el-form-item__label {
          width: 150px;
        }
      }
      .el-input {
        width: 60%;
      }
      .el-textarea {
        width: 60%;
      }
      .el-select {
        width: 70%;
      }
    }
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
