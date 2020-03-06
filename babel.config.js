console.log('babel----config');
console.log(process.env.APP_LIBRARY);
const presets = [
  [
    "@babel/preset-env",
  ]
];
const plugins = [
  'lodash',
];

module.exports = {
  presets,
  plugins
};
