<template>
  <div class="aplayer" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <!-- 音乐播放器 -->
    <div id="aplayer"></div>
  </div>
</template>

<script>
import "../../utils/APlayer.min.js";
export default {
  data() {
    return {
      ap: null,
      playIcon: "fa-solid fa-play",
      aplayerWidth: null,
    };
  },
  mounted() {
    // ========== 歌单配置说明 ==========
    // 1. 打开网易云音乐，找到你喜欢的歌单
    // 2. 复制歌单链接，如：https://music.163.com/#/playlist?id=626864109
    // 3. 把链接中的数字（626864109）复制到下面的 id 中
    // 4. 支持的音乐平台：netease(网易云), tencent(QQ音乐), kugou(酷狗), kuwo(酷我)
    // 5. 支持的类型：playlist(歌单), song(单曲), album(专辑)
    
    let server = "netease"; //netease: 网易云音乐; tencent: QQ音乐; kugou: 酷狗音乐; xiami: 虾米; kuwo: 酷我
    let type = "playlist"; //song: 单曲; playlist: 歌单; album: 唱片
    let id = "626864109"; //歌单 ID（在这里修改成你的歌单ID）
    const apiUrl = `https://api.i-meto.com/meting/api?server=${server}&type=${type}&id=${id}`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`音乐API请求失败: ${response.status}`);
        }
        // 检查内容类型
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error('音乐API返回非JSON数据');
        }
        return response.json();
      })
      .then((data) => {
        this.ap = new APlayer({
          container: document.getElementById("aplayer"),
          order: "random",
          preload: "none",
          listMaxHeight: "260px",
          fixed: "true",
          volume: 0.1,
          mutex: true,
          lrcType: 3,
          audio: data,
        });
        /* 底栏歌词 */
        setInterval(() => {
          $("#music-name").html($(".aplayer-lrc-current").text());
        }, 500);
        /* 音乐通知及控制 */
        this.ap.on("play", () => {
          const currentMusic = this.ap.list.current;
          this.playIcon = "fa-solid fa-pause";
        });
        this.ap.on("pause", () => {
          this.playIcon = "fa-solid fa-play";
        });
        window.onkeydown = (e) => {
          if (e.keyCode === 32) {
            this.ap.toggle();
          }
        };
        this.ap.list.show();
      })
      .catch((error) => {
        console.error('音乐播放器初始化失败:', error);
        // 可以在这里添加用户友好的错误提示
        // 或者加载默认的音乐列表
      });
  },
  methods: {
    playLast() {
      this.ap.skipBack();
      this.ap.on("play", () => {
        const music = `${currentMusic.title} - ${currentMusic.author}`;
        iziToast.info({
          timeout: 4000,
          icon: "fa-solid fa-circle-play",
          displayMode: "replace",
          message: music,
        });
        $("#music-name").text(`${currentMusic.title} - ${currentMusic.author}`);
        this.playIcon = "fa-solid fa-pause";
      });
      this.ap.on("pause", () => {
        this.playIcon = "fa-solid fa-play";
      });
    },
    handlePlay() {
      const music =
        this.$refs.aplayer.$el.querySelector(".aplayer-title").textContent +
        this.$refs.aplayer.$el.querySelector(".aplayer-author").textContent;
      iziToast.info({
        timeout: 4000,
        icon: "fa-solid fa-circle-play",
        displayMode: "replace",
        message: music,
      });
      this.playIcon = "fa-solid fa-pause";
      this.musicName = music;
      if (window.innerWidth >= 990) {
        this.showPower = false;
        this.showLrc = true;
      }
    },
    togglePlay() {
      this.ap.toggle();
    },
    playNext() {
      this.ap.skipForward();
    },
    mouseenter() {
      // $(".aplayer-body").css({
      //   transition: "all 0.3s linear",
      //   transform: "translateX(68px)",
      // });
    },
    mouseleave() {
      this.ap.list.hide();
      // this.aplayerWidth = $(".aplayer-body").width();
      // if (this.aplayerWidth < 400) {
      //   $(".aplayer-body").css({
      //     transition: "all 0.3s linear",
      //     transform: "translateX(0px)",
      //   });
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.aplayer {
  margin: 0;
}
::v-deep #aplayer {
  margin: 0;
  &.aplayer-fixed {
    bottom: 330px;
    .aplayer-body {
      bottom: 330px;
      /* left: -68px; */
    }
    .aplayer-lrc {
      text-shadow: none;
      p {
        font-size: 16px;
        color: var(--bigRed);
      }
    }
  }
  .aplayer-miniswitcher .aplayer-icon path {
    fill: var(--darkBlue);
  }
}
</style>
