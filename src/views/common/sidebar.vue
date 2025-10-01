<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="this.$route.path"
      background-color="transparent"
      text-color="var(--black5)"
      active-text-color="var(--blue1)"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            {{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          icon: "el-icon-s-home",
          index: "/backendMain",
          title: "系统首页",
        },
        {
          icon: "el-icon-s-tools",
          index: "/webEdit",
          title: "网站设置",
        },
        {
          icon: "el-icon-user-solid",
          index: "/userList",
          title: "用户管理",
        },
        {
          icon: "el-icon-postcard",
          index: "/postList",
          title: "文章管理",
        },
        {
          icon: "el-icon-notebook-2",
          index: "/sortList",
          title: "分类管理",
        },
        {
          icon: "el-icon-edit-outline",
          index: "/commentList",
          title: "评论管理",
        },
        {
          icon: "el-icon-s-comment",
          index: "/treeHoleList",
          title: "留言管理",
        },
        {
          icon: "el-icon-paperclip",
          index: "/resourceList",
          title: "资源管理",
        },
        {
          icon: "el-icon-bank-card",
          index: "/resourcePathList",
          title: "资源路径管理",
        },
        {
          icon: "el-icon-sugar",
          index: "/loveList",
          title: "表白墙管理",
        },
        {
          icon: "el-icon-s-comment",
          index: "/prohibitedWordsList",
          title: "违禁词管理",
        },
      ],
    };
  },
  created() {
    if (
      this.$store.state.currentUser.userType === 3 ||
      this.$store.state.currentAdmin.userType === 3
    ) {
      this.items = this.items.filter((item) => item.index !== "/userList");
    }
  },
};
</script>
<style lang="scss" scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.18);
  &::-webkit-scrollbar {
    width: 0;
  }
  &-el-menu {
    width: 200px;
    background: transparent !important;
  }
  > ul {
    height: 100%;
  }
}

// 覆盖 element-ui 菜单项的背景色
::v-deep .el-menu-item {
  background-color: transparent !important;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3) !important;
  }
  
  &.is-active {
    background-color: rgba(66, 90, 239, 0.1) !important;
  }
}
</style>
