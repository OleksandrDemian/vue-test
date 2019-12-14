<template>
  <div id="app">
    <el-menu :router="true" :default-active="activeIndex" text-color="#fff" active-text-color="#ffd04b" mode="horizontal" background-color="#545c64">
      <el-menu-item index="/login">Login</el-menu-item>
      <el-menu-item index="/posts">Posts</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',

  data: () => ({
    activeIndex: "/posts"
  })
}
</script>

<style>

</style>
