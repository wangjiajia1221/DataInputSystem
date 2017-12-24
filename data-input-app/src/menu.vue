<template>
  <div>
    <div class="top-logo">
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :unique-opened="true"
      :router="true"
      :default-active="$route.path"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>社会工作</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/zhengcechuangzhi">
            <i class="el-icon-menu"></i>
            <span slot="title">政策创制</span>
          </el-menu-item>
          <el-menu-item index="/xingzhengjigou">
            <i class="el-icon-setting"></i>
            <span slot="title">行政机构</span>
          </el-menu-item>
          <el-menu-item index="/gangwei">
            <i class="el-icon-setting"></i>
            <span slot="title">社工岗位</span>
          </el-menu-item>
          <el-menu-item index="/rencaiziyuan">
            <i class="el-icon-setting"></i>
            <span slot="title">人才资源</span>
          </el-menu-item>
          <el-menu-item index="/rencaipeixun">
            <i class="el-icon-setting"></i>
            <span slot="title">人才培训</span>
          </el-menu-item>
          <el-menu-item index="/hangyexiehui">
            <i class="el-icon-setting"></i>
            <span slot="title">行业协会</span>
          </el-menu-item>
          <el-menu-item index="/minbanjigou">
            <i class="el-icon-setting"></i>
            <span slot="title">民办机构</span>
          </el-menu-item>
          <el-menu-item index="/zijintouru">
            <i class="el-icon-setting"></i>
            <span slot="title">资金投入</span>
          </el-menu-item>
          <el-menu-item index="/shehuishidian">
            <i class="el-icon-setting"></i>
            <span slot="title">社会试点</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>志愿服务</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/zyfwzhengce">
            <i class="el-icon-setting"></i>
            <span slot="title">政策创制</span>
          </el-menu-item>
          <el-menu-item index="/zyfwzuzhi">
            <i class="el-icon-setting"></i>
            <span slot="title">志愿服务组织</span>
          </el-menu-item>
          <el-menu-item index="/zyzzhuce">
            <i class="el-icon-setting"></i>
            <span slot="title">志愿者注册</span>
          </el-menu-item>
          <el-menu-item index="/zyzpeixun">
            <i class="el-icon-setting"></i>
            <span slot="title">志愿者培训</span>
          </el-menu-item>
          <el-menu-item index="/jilugongzuo">
            <i class="el-icon-setting"></i>
            <span slot="title">记录工作</span>
          </el-menu-item>
          <el-menu-item index="/huodongkaizhan">
            <i class="el-icon-setting"></i>
            <span slot="title">活动开展</span>
          </el-menu-item>
          <el-menu-item index="/jilibaozhang">
            <i class="el-icon-setting"></i>
            <span slot="title">激励保障</span>
          </el-menu-item>
          <el-menu-item index="/zyfwzijin">
            <i class="el-icon-setting"></i>
            <span slot="title">资金投入</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
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