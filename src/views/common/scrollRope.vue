<template>
  <div class="scroll-rope-container" v-show="showRope">
    <!-- 绳子 -->
    <div class="rope" :class="{ 'rope-pulling': isPulling }"></div>
    <!-- 灯泡 -->
    <div class="light-bulb" :class="{ 'light-on': isPulling }">
      <div class="bulb-glow"></div>
      <div class="bulb-body"></div>
      <div class="bulb-base"></div>
    </div>
    <!-- 电量显示 -->
    <div class="battery-indicator" :class="{ 'show': isPulling }">
      <div class="battery-level" :style="{ height: batteryLevel + '%' }"></div>
      <span class="battery-text">{{ batteryLevel }}%</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScrollRope",
  data() {
    return {
      showRope: false,
      isPulling: false,
      batteryLevel: 25, // 初始电量
      scrollThreshold: 100, // 滚动多少像素后显示绳子
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.updateBattery();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // 当滚动超过阈值时显示绳子
      this.showRope = scrollTop > this.scrollThreshold;
      
      // 接近底部时触发"拉动"效果
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollTop + windowHeight) / documentHeight;
      
      if (scrollPercentage > 0.9) {
        this.isPulling = true;
      } else {
        this.isPulling = false;
      }
    },
    updateBattery() {
      // 模拟电量变化（可以根据实际需求修改）
      setInterval(() => {
        // 可以根据页面访问时长、互动次数等计算电量
        const now = new Date();
        const minutes = now.getMinutes();
        this.batteryLevel = Math.min(25 + (minutes % 60), 100);
      }, 60000); // 每分钟更新一次
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-rope-container {
  position: fixed;
  right: 30px;
  top: 0;
  width: 60px;
  height: 100vh;
  pointer-events: none;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 绳子 */
.rope {
  width: 4px;
  height: 0;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(139, 69, 19, 0.8),
    rgba(101, 67, 33, 0.9)
  );
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  animation: ropeDown 2s ease-out forwards;
  transform-origin: top;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 8px;
    background: rgba(139, 69, 19, 0.9);
    border-radius: 50%;
  }
  
  &.rope-pulling {
    animation: ropePulling 0.5s ease-in-out infinite;
  }
}

@keyframes ropeDown {
  from {
    height: 0;
  }
  to {
    height: 200px;
  }
}

@keyframes ropePulling {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}

/* 灯泡 */
.light-bulb {
  position: relative;
  width: 50px;
  height: 70px;
  margin-top: -5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  
  &.light-on {
    transform: scale(1.1);
    
    .bulb-glow {
      opacity: 0.8;
      box-shadow: 0 0 30px rgba(255, 223, 0, 0.8);
    }
    
    .bulb-body {
      background: radial-gradient(
        circle at 30% 30%,
        #ffeb3b,
        #fdd835,
        #f9a825
      );
      box-shadow: 0 0 20px rgba(255, 223, 0, 0.6);
    }
  }
}

.bulb-glow {
  position: absolute;
  top: 0;
  width: 60px;
  height: 60px;
  background: radial-gradient(
    circle,
    rgba(255, 223, 0, 0.3),
    transparent 70%
  );
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s ease;
}

.bulb-body {
  width: 40px;
  height: 50px;
  background: radial-gradient(
    circle at 30% 30%,
    #e0e0e0,
    #bdbdbd,
    #9e9e9e
  );
  border-radius: 50% 50% 40% 40%;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  box-shadow: 
    inset -5px -5px 10px rgba(0, 0, 0, 0.1),
    inset 5px 5px 10px rgba(255, 255, 255, 0.3);
}

.bulb-base {
  width: 30px;
  height: 15px;
  background: linear-gradient(
    to bottom,
    #757575,
    #616161,
    #424242
  );
  border-radius: 0 0 3px 3px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 0;
    width: 100%;
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
  }
}

/* 电量指示器 */
.battery-indicator {
  position: absolute;
  bottom: 50px;
  right: -20px;
  width: 40px;
  height: 80px;
  background: rgba(255, 255, 255, 0.9);
  border: 3px solid var(--fontColor);
  border-radius: 5px;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s ease;
  overflow: hidden;
  
  &.show {
    opacity: 1;
    transform: scale(1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 15px;
    height: 5px;
    background: var(--fontColor);
    border-radius: 2px 2px 0 0;
  }
}

.battery-level {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(
    to top,
    #4caf50,
    #8bc34a,
    #cddc39
  );
  transition: height 0.5s ease;
}

.battery-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: bold;
  color: var(--fontColor);
  z-index: 1;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .scroll-rope-container {
    right: 10px;
    width: 40px;
  }
  
  .rope {
    width: 3px;
  }
  
  .light-bulb {
    width: 35px;
    height: 50px;
  }
  
  .bulb-body {
    width: 30px;
    height: 40px;
  }
  
  .bulb-base {
    width: 25px;
    height: 12px;
  }
  
  .battery-indicator {
    width: 30px;
    height: 60px;
    right: -10px;
  }
}
</style>

