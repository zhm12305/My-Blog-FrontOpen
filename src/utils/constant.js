export default {
  // 开发环境配置 - 临时使用HTTP测试
  baseURL: "http://blog.inter-trade.top/api",
  webURL: "http://blog.inter-trade.top",
  // baseURL: "http://www.monkey-papa.com/api", // 线上地址加上/api
  // webURL: "http://www.monkey-papa.com",  // 线上地址
  //诗词语录
  hitokoto: "https://v1.hitokoto.cn",
  shehui: "https://api.oick.cn/yulu/api.php",
  jinrishici: "https://v1.jinrishici.com/all.json",
  //目录
  tocbot: "https://cdn.bootcdn.net/ajax/libs/tocbot/4.21.0/tocbot.min.js",
  //上传图片文件地址 elementUI:action
  qiniuUploadImages: "http://blog.inter-trade.top/api/resource/updateImage/", // 你的后端线上地址加上/api/resource/updateImage/
  //表情地址,md图片地址
  qiniuUploadEntrance: "http://blog.inter-trade.top/", // 你的后端域名
  //视频地址
  favoriteVideo: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
  //按钮颜色
  before_color_1: "var(--blue13)",
  after_color_1: "linear-gradient(45deg, var(--red), var(--purple1))",
  //评论分页颜色 微言分页颜色
  commentPageColor: "var(--green6)",
  userId: 9, // 博客主人的用户id
  //emoji含义
  emojiList: [
    "衰",
    "鄙视",
    "再见",
    "捂嘴",
    "摸鱼",
    "奋斗",
    "白眼",
    "可怜",
    "皱眉",
    "鼓掌",
    "烦恼",
    "吐舌",
    "挖鼻",
    "委屈",
    "滑稽",
    "啊这",
    "生气",
    "害羞",
    "晕",
    "好色",
    "流泪",
    "吐血",
    "微笑",
    "酷",
    "坏笑",
    "吓",
    "大兵",
    "哭笑",
    "困",
    "呲牙",
  ],
  //纯色
  SolidColor: [
    "#f7f9fe",
    "#30303c",
    "#7a7374",
    "#eea6b7",
    "#918072",
    "#fbecde",
    "#a4aca7",
    "#a4cab6",
    "#83a78d",
    "#70887d",
    "#57c3c2",
    "#10aec2",
    "#93d5dc",
    "#3b818c",
    "#5cb3cc",
    "#93b5cf",
  ],
  //渐变
  gradient: [
    "55deg, #0095c2 21%, #64E1C8 100%",
    "90deg, #ffd7e4 0%, #c8f1ff 100%",
    "45deg, #e5737b, #c6999e, #96b9c2, #00d6e8",
    "25deg, #31354b, #38536c, #3b738e, #3995b2",
    "26deg, #0e6183, #387ea6, #599dcb, #7abdf1",
    "25deg, #0583bf, #159bc5, #16b4cb, #0aced0",
    "25deg, #3e47d1, #8b5fb8, #ba7b9d, #df9980",
    "25deg, #0e5c71, #15828f, #19a9ae, #1ad3ce",
  ],
  about: [
    {
      img: "https://picsum.photos/300/400?random=1",
      tit: "博客创建者",
      sub: "欢迎来到我的个人博客😊",
    },
    {
      img: "https://picsum.photos/300/400?random=2",
      tit: "技术爱好者",
      sub: "专注于前后端开发🚀",
    },
    {
      img: "https://picsum.photos/300/400?random=3",
      tit: "终身学习者",
      sub: "保持好奇心，不断学习📚",
    },
    {
      img: "https://picsum.photos/300/400?random=4",
      tit: "代码分享者",
      sub: "乐于分享技术心得💻",
    },
    {
      img: "https://picsum.photos/300/400?random=5",
      tit: "生活记录者",
      sub: "用文字记录美好时光✨",
    },
    {
      img: "https://picsum.photos/300/400?random=6",
      tit: "梦想追逐者",
      sub: "为理想而努力奋斗🎯",
    },
  ],
  themeMapConfig: [
    {
      title: "1. 图片（电脑）",
      collapseTitle: "查看适配电脑端背景",
      handleVal: "pc",
      class: "box",
      dataList: [],
      style: "img",
    },
    {
      title: "2. 图片（移动端）",
      collapseTitle: "查看适配移动端背景",
      handleVal: "mobile",
      class: "box mobileBox",
      dataList: [],
      style: "img",
    },
    {
      title: "3. 渐变色",
      collapseTitle: "查看渐变色背景",
      handleVal: "gradient",
      class: "box",
      dataList: [],
      style: "gradient",
    },
    {
      title: "4. 纯色",
      collapseTitle: "查看纯色背景",
      handleVal: "solid",
      class: "box",
      dataList: [],
      style: "solid",
    },
  ],
  //随机 微言颜色 标签颜色
  tree_hole_color: (function () {
    function getRandomColor() {
      return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      })`;
    }
    const colors = [];
    for (let i = 0; i < 6; i++) {
      colors.push(getRandomColor());
    }
    return colors;
  })(),
};
