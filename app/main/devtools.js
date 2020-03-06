exports.setupDevTools = async () => {
  // 如果是生产环境，不安装开发者工具
  const {
    default: installExtension,
    VUEJS_DEVTOOLS
  } = require('electron-devtools-installer');
  try {
    const vueTool = await installExtension(VUEJS_DEVTOOLS);
    console.log(`installDevTools: Installed ${vueTool}`);
  } catch (error) {
    console.warn(`installDevTools: Error occured:`, error);
  }
};
