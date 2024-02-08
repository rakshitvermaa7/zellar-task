module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-paper/babel',
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
        root: ['.'],
        alias: {
          '@components': './src/components',
          '@navigators': './src/navigators',
          '@screens': './src/screens',
          '@lib': './src/lib',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
