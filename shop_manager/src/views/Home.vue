<template>
  <div>
      <el-button type="danger" @click="logout">安全退出</el-button>
  </div>
</template>

<script>
export default {
  name:'home',
  methods:{
    logout(){
      //清除token
      window.sessionStorage.clear();
      //跳转到登录页面
      this.$router.push('/login')
    }
  }
}
</script>

<style>

</style>