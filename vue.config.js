module.exports = {
  productionSourceMap: true,
  baseUrl: './',
  outputDir: 'dist',
  assetsDir: 'static',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 16,
            unitPrecision: 5,
            propList: ['*'],
            // selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixeValue: 0
          })
        ]
      }
    }
  },
  configureWebpack: config => {
    Object.assign(config, {
      externals: {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter'
      }
    })
  },
  devServer: {
    proxy: {
      '/promotionactivity': {
        target: 'http://10.1.62.23:30012',
        changeOrigin: true
      },
      '/doubleeleven': {
        target: 'http://10.1.4.160:18888',
        changeOrigin: true
      },
      '/couponcenter': {
        target: 'https://thk.34580.com',
        changeOrigin: true
      },
      '/sz': {
        target: 'http://10.1.62.170:29503',
        changeOrigin: true,
      },
      '/wx': {
        target: 'http://10.1.62.170:29503',
        changeOrigin: true
      },
      '/sh': {
        target: 'http://10.1.62.170:29503',
        changeOrigin: true
      }
    }
  }
}