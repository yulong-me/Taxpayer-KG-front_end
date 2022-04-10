const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const isProduction = process.env.NODE_ENV === 'production';


module.exports = {
    publicPath: './',
    configureWebpack: {
        externals: {
            vue: 'Vue',
            'vue-router': 'VueRouter',
            vuex: 'Vuex',
            axios: 'axios',
            'element-ui': 'ELEMENT',
            '@antv/g6':'G6'
        }

    },

    chainWebpack: config => {
            config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin);

    },
}
