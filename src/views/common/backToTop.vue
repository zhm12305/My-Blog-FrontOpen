<template>
  <div>
    <!-- PC端：绳子效果 -->
    <div
      class="cd-top"
      v-if="!$common.mobile()"
      @click="toTop()"
      :style="{ top: showButton ? topPosition : '-900px' }"
    ></div>
    
    <!-- 移动端：火箭图标 -->
    <div class="toolButton-mobile" v-if="$common.mobile()">
      <div class="backTop" v-if="showButton" @click="toTop()">
        <img src="../../assets/svg/rocket.svg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BackToTop",
  data() {
    return {
      scrollTop: 0,
      showButton: false,
      topPosition: "0px",
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScrollPage);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScrollPage);
  },
  methods: {
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    onScrollPage() {
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      
      // 判断是否显示按钮（滚动超过一屏高度）
      let isShow = this.scrollTop - window.innerHeight > 30;
      this.showButton = isShow;
      
      // PC端调整绳子位置
      if (isShow && !this.$common.mobile()) {
        if (window.innerHeight > 950) {
          this.topPosition = "0px";
        } else {
          this.topPosition = (window.innerHeight - 950) + "px";
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* PC端绳子样式 */
.cd-top {
  background: var(--toTop) no-repeat center;
  position: fixed;
  right: 5vh;
  top: -900px;
  z-index: 99;
  width: 70px;
  height: 900px;
  background-size: contain;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  
  &:hover {
    transform: translateX(-5px);
  }
}

/* 移动端火箭样式 */
.toolButton-mobile {
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 99;
}

.backTop {
  width: 45px;
  height: 45px;
  background: var(--background);
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease-in;
  
  img {
    width: 25px;
    height: 25px;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
}
</style>

