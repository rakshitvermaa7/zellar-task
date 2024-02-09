module.exports = {
  preset: 'react-native',
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['node_modules/?!(react-native)'],
};