// Create React App Configuration Override is an easy and comprehensible configuration layer for create-react-app. https://github.com/gsoft-inc/craco

const CracoAntDesignPlugin = require('craco-antd');
const CracoLessPlugin = require('craco-less');
const CracoAlias = require('craco-alias');
const path = require('path');

module.exports = {
  plugins: [
    /* antd组件按需加载&样式覆盖等 */
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(
          __dirname,
          'src/styles/antd.theme.less'
        ),
      },
    },
    /* 支持less module */
    {
      plugin: CracoLessPlugin,
      options: {
        cssLoaderOptions: {
          modules: { localIdentName: '[local]_[hash:base64:5]' },
        },
        // eslint-disable-next-line no-unused-vars
        modifyLessRule(lessRule, _context) {
          // eslint-disable-next-line no-param-reassign
          lessRule.test = /\.(module)\.(less)$/;
          // eslint-disable-next-line no-param-reassign
          lessRule.exclude = path.join(__dirname, 'node_modules');
          return lessRule;
        },
      },
    },
    /* 别名设置 */
    {
      plugin: CracoAlias,
      options: {
        source: 'options',
        baseUrl: './',
        aliases: {
          '@styles': './src/styles',
        },
      },
    },
  ],
  devServer: (devServerConfig) => {
    return {
      ...devServerConfig,
      // 服务开启gzip
      compress: true,
      proxy: {
        '/api': {
          target: 'https://localhost:9099/',
          changeOrigin: true,
          xfwd: false,
        },
      },
    };
  },
};
