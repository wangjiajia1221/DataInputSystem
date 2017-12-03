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
      <el-menu-item index="/hangyexiehui">
        <i class="el-icon-setting"></i>
        <span slot="title">行业协会</span>
      </el-menu-item>
      <el-menu-item index="/gangwei">
        <i class="el-icon-setting"></i>
        <span slot="title">岗位</span>
      </el-menu-item>
      <el-menu-item index="/fuwuzhandian">
        <i class="el-icon-setting"></i>
        <span slot="title">服务站点</span>
      </el-menu-item>
      <el-menu-item index="/shehuigongzuojigou">
        <i class="el-icon-setting"></i>
        <span slot="title">社会工作机构</span>
      </el-menu-item>
      <el-menu-item index="/peixun">
        <i class="el-icon-setting"></i>
        <span slot="title">培训</span>
      </el-menu-item>
      <el-menu-item index="/zhiyeshuipingkaoshi">
        <i class="el-icon-setting"></i>
        <span slot="title">职业水平考试</span>
      </el-menu-item>
      <el-menu-item index="/zijintouru">
        <i class="el-icon-setting"></i>
        <span slot="title">资金投入</span>
      </el-menu-item>
      <el-menu-item index="/xinxixitong">
        <i class="el-icon-setting"></i>
        <span slot="title">信息系统</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="less">
  .el-menu{
    width: 200px;
    min-height: 400px;
    text-align: left;
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