<template>
  <div>
    <div class="top-logo">
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :router="true"
      :default-active="$route.path"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="first">页面1</el-menu-item>
          <el-menu-item index="second">页面2</el-menu-item>
        </el-menu-item-group>
          <el-menu-item index="third">页面3</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/zhengcechuangzhi">
        <i class="el-icon-menu"></i>
        <span slot="title">政策创制</span>
      </el-menu-item>
      <el-menu-item index="/xingzhengjigou">
        <i class="el-icon-setting"></i>
        <span slot="title">行政机构</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="less">
  .el-menu{
    width: 200px;
    min-height: 400px;
    .el-submenu {
      .el-menu {
        min-height: auto;
      } 
    }
  }
  .top-logo {
    width:200px;
    height:65px;
    background: #ffffff url(./assets/images/swchina_logo.png) no-repeat 50%;
    background-size: 95%;
  }
</style>

<script>
  export default {
    data() {
      return {
      };
    },
    methods: {
      handleOpen(key, keyPath) {

        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>