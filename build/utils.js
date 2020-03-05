const path = require('path');
const resolvePath = p => path.join(__dirname, '..', p)
exports.devServerContentPath = resolvePath('app/render')
exports.resolvePath = resolvePath;