console.log('babel----config');
console.log(process.env.APP_LIBRARY);
const presets = [
  [
    "@babel/preset-env",
    {
      "useBuiltIns": "usage",
      corejs: '3.0.0',
    }
  ]
];
const plugins = [
  'lodash',
];

module.exports = {
  presets,
  plugins
};
