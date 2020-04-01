<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <!-- 网站logo -->
        <img src="@/assets/logo.png" alt="系统logo" width="60px" height="55px" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="danger" @click="logout">安全退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'60px':'200px'">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu
          :default-active="activeItem"
          background-color="#373d41"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true"
          :collapse="isCollapse"
          :router="true"
          :collapse-transition="false"
        >
          <!-- 具有子导航的导航按钮 -->
          <el-submenu :index="'/'+menu.path" v-for="menu in menuList" :key="menu.id">
            <!-- 一级导航 -->
            <template slot="title">
              <i :class="iconsObj[menu.id]"></i>
              <span slot="title">{{menu.authName}}</span>
            </template>
            <!-- 二级导航 -->
            <el-menu-item
              :index="'/'+subMenu.path"
              v-for="subMenu in menu.children"
              :key="subMenu.id" @click="saveActiveItem('/'+subMenu.path)"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">{{subMenu.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      isCollapse: false,
      menuList: [],
      //左侧菜单栏的图标数组
      iconsObj: {
        125: "el-icon-user",
        103: "el-icon-s-tools",
        101: "el-icon-s-goods",
        102: "el-icon-s-order",
        145: "el-icon-s-data"
      },
      activeItem:''
    };
  },
  //数据的请求时机，使用钩子函数
  async created() {
    const { data: res } = await this.$http.get("menus");
    if (res.meta.status !== 200) {
      this.$msg.error(res.meta.msg);
      return;
    }
    this.menuList = res.data;
    var newItem=window.sessionStorage.getItem('activeItem')
    if(!newItem){
      this.activeItem='/welcome'
    }else{
      this.activeItem=newItem
    }
    console.log(this.menuList)
  },
  methods: {
    logout() {
      //清除token
      window.sessionStorage.clear();
      //跳转到登录页面
      this.$router.push("/login");
    },
    saveActiveItem(item){
      window.sessionStorage.setItem('activeItem',item)
    }
  }
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 20px;
    }
  }
}
.el-aside {
  background-color: #373d41;
  .el-menu {
    background-color: #373d41;
  }
}
</style>