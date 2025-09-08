/* 先引入打包分析插件 */
// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const cdn = {
  js: [
    "https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js",
    "https://cdn.jsdelivr.net/npm/vue-router@3.2.0/dist/vue-router.min.js", 
    "https://cdn.jsdelivr.net/npm/axios@0.21.4/dist/axios.min.js",
    "https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js",
  ],
  externals: {
    vue: "Vue",
    "vue-router": "VueRouter",
    axios: "axios",
    jquery: "$",
    echarts: "echarts",
  },
};
module.exports = {
  devServer: {
    port: 81,
  },
  configureWebpack: {
    plugins: [
      // 依赖大小分析工具 (生产环境移除)
      // new BundleAnalyzerPlugin(),
    ],
    //这就是在告诉Webpack：请不要将这个模块注入编译后的JS文件里，对于我源代码里出现的任何import/require这个模块的语句，请将它保留。
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      // vuex: "Vuex",
      axios: "axios",
      echarts: "echarts", // 配置使用CDN
    },
  },
  lintOnSave: false,
  productionSourceMap: false, // 打包成 web页面 使用，一般建议 false，不然会生成很多map文件
  chainWebpack(config) {
    // 引入CDN
    // webpack需要排除的依赖名称和挂载在window上的对象属性名称
    config.set("externals", cdn.externals);
    config.plugin("html").tap((args) => {
      args[0].cdn = cdn;
      return args;
    });
  },
};
