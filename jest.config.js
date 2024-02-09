module.exports = {
  preset: 'react-native',
  setupFiles: ['./node_modules/@testing-library/react-native/extend-expect'],
  transformIgnorePatterns: [
    '/node_modules/(?!(react-native|react-navigation|@react-navigation/.*))',
  ],
};
