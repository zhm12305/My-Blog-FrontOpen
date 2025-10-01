<template>
  <div class="admin-container">
    <div class="admin-background"></div>
    <myHeader></myHeader>
    <sidebar></sidebar>
    <div class="content-box">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import myHeader from '../common/myHeader.vue'
import sidebar from '../common/sidebar.vue'

export default {
  components: {
    myHeader,
    sidebar
  }
}
</script>

<style lang="scss" scoped>
.admin-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.admin-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://zhi-blog.inter-trade.top/yinlang.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
}

.content-box {
  position: absolute;
  left: 200px;
  right: 0;
  top: 70px;
  bottom: 0;
  transition: left 0.3s ease-in-out;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.content {
  width: auto;
  height: 100%;
  padding: 30px;
  overflow-y: scroll;
}
</style>
