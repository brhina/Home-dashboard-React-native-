module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: ['last 2 versions', 'not dead', '> 0.2%']
      },
      modules: 'commonjs',
    }],
    '@babel/preset-react',
    '@babel/preset-typescript',
    'module:@react-native/babel-preset',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-modules-commonjs',
  ],
  sourceType: 'unambiguous',
};

