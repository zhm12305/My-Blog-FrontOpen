<template>
  <div style="animation: header-effect 2s" :style="{
      background: `${
        $store.state.changeBg &&
        [''].includes($route.path)
          ? $store.state.changeBg
          : ''
      }`,
    }" class="poem-container myCenter my-animation-hideToShow background-image background-image-changeBg" v-if="!$common.isEmpty(guShi.origin) || !$common.isEmpty(hitokoto.hitokoto)">
    <div class="poem-wrap">
      <div v-if="isShehui">
        <span>{{ $store.state.webInfo.webName }}</span>
      </div>
      <div v-else>
        <span>{{ isHitokoto ? hitokoto.from : guShi.origin }}</span>
      </div>
      <p class="poem">{{ isHitokoto ? hitokoto.hitokoto : guShi.content }}</p>
      <p class="info" v-if="
          !isShehui &&
          (!isHitokoto || (isHitokoto && !$common.isEmpty(hitokoto.from_who)))
        ">
        {{ isHitokoto ? hitokoto.from_who : guShi.author }}
</p>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    isHitokoto: {
      type: Boolean,
      default: true
    },
    isShehui: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      guShi: {
        content: '...',
        origin: '...',
        author: '...',
        category: '...'
      },
      hitokoto: {
        hitokoto: '...',
        from: '...',
        from_who: '...'
      }
    }
  },
  created() {
    if (!this.isShehui) {
      if (this.isHitokoto) {
        this.getHitokoto()
      } else {
        this.getGuShi()
      }
    } else {
      this.hitokoto.from = ''
      this.hitokoto.from_who = ''
      this.sendShehui()
    }
  },

  methods: {
    sendShehui() {
      let that = this
      let xhr = new XMLHttpRequest()
      xhr.open('get', this.$constant.shehui)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              // 兼容新的API响应格式
              const response = JSON.parse(xhr.responseText)
              if (response.code === 200 && response.data) {
                that.hitokoto.hitokoto = response.data
              } else {
                // 尝试原始格式（纯文本）
                let shehui = xhr.responseText
                if (shehui && shehui.length > 2) {
                  that.hitokoto.hitokoto = shehui.substring(1, shehui.length - 1)
                } else {
                  that.hitokoto.hitokoto = '社会语录加载失败'
                }
              }
            } catch (error) {
              // 如果JSON解析失败，尝试作为纯文本处理
              try {
                let shehui = xhr.responseText
                if (shehui && shehui.length > 2) {
                  that.hitokoto.hitokoto = shehui.substring(1, shehui.length - 1)
                } else {
                  that.hitokoto.hitokoto = '社会语录加载失败'
                }
              } catch (error2) {
                console.error('处理社会语录失败:', error2)
                that.hitokoto.hitokoto = '社会语录加载失败'
              }
            }
          } else {
            console.error('社会语录API请求失败，状态码:', xhr.status)
            that.hitokoto.hitokoto = '社会语录加载失败'
          }
        }
      }
      xhr.onerror = function() {
        console.error('社会语录API网络错误')
        that.hitokoto.hitokoto = '网络连接失败'
      }
      xhr.send()
    },
    getGuShi() {
      let that = this
      let xhr = new XMLHttpRequest()
      xhr.open('get', this.$constant.jinrishici)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              const contentType = xhr.getResponseHeader("content-type");
              if (contentType && contentType.includes("application/json")) {
                that.guShi = JSON.parse(xhr.responseText)
              } else {
                console.warn('诗词API返回非JSON数据')
                that.guShi = { content: "诗词加载失败" }
              }
            } catch (error) {
              console.error('解析诗词JSON失败:', error)
              that.guShi = { content: "诗词加载失败" }
            }
          } else {
            console.error('诗词API请求失败，状态码:', xhr.status)
            that.guShi = { content: "诗词加载失败" }
          }
        }
      }
      xhr.onerror = function() {
        console.error('诗词API网络错误')
        that.guShi = { content: "网络连接失败" }
      }
      xhr.send()
    },
    getHitokoto() {
      let that = this
      let xhr = new XMLHttpRequest()
      xhr.open('get', this.$constant.hitokoto)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              const contentType = xhr.getResponseHeader("content-type");
              if (contentType && contentType.includes("application/json")) {
                that.hitokoto = JSON.parse(xhr.responseText)
              } else {
                console.warn('一言API返回非JSON数据')
                that.hitokoto = { hitokoto: "一言加载失败" }
              }
            } catch (error) {
              console.error('解析一言JSON失败:', error)
              that.hitokoto = { hitokoto: "一言加载失败" }
            }
          } else {
            console.error('一言API请求失败，状态码:', xhr.status)
            that.hitokoto = { hitokoto: "一言加载失败" }
          }
        }
      }
      xhr.onerror = function() {
        console.error('一言API网络错误')
        that.hitokoto = { hitokoto: "网络连接失败" }
      }
      xhr.send()
    }
  }
}
</script>
<style lang="scss" scoped>
.poem-container {
  padding: 90px 0 40px;
  position: relative;
}
.poem-wrap {
  border-radius: 10px;
  z-index: 10;
  text-align: center;
  letter-spacing: 4px;
  font-weight: 300;
  width: 100%;
  max-width: 800px;
  div span {
    padding: 5px 10px;
    color: var(--red);
    font-size: 2em;
    border-radius: 5px;
  }
  p {
    width: 100%;
    max-width: 800px;
    color: var(--darkBlue1);
    &.poem {
      margin: 40px auto;
      font-size: 1.5em;
    }
    &.info {
      margin: 20px auto 40px;
      font-size: 1.1em;
    }
  }
}
.background-image-changeBg {
  height: 100vh !important;
}
</style>
