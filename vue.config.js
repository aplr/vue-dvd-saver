module.exports = {
    chainWebpack: config => {
        const svgRule = config.module.rule('svg')

        svgRule.uses.clear()

        svgRule
            .oneOf('external')
            .resourceQuery(/external/)
            .use('file-loader')
            .loader('file-loader')
            .options({
                name: 'img/[name].[hash:8].[ext]'
            })
            .end()
            .end()
            .oneOf('inline')
            .resourceQuery(/inline/)
            .use('svg-inline-loader')
            .loader('svg-inline-loader')
            .options({
                classPrefix: false
            })
            .end()
            .end()
            .oneOf('module')
            .use('babel-loader')
            .loader('babel-loader')
            .end()
            .use('vue-svg-loader')
            .loader('vue-svg-loader')
            .end()
            .end()
    }
}
