module.exports = {
  presets: [
    '@vue/app'
  ],
   plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: false,
        useESModules: true
      }
    ],
    ['import', {
      libraryName: '@roto/component-vact',
      libraryDirectory: 'es',
      style: true
    }, '@roto/component-vact']
  ]
}
