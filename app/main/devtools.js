exports.setupDevTools = async () => {
  // 如果是生产环境，不安装开发者工具
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS,
    REACT_PERF
  } = require('electron-devtools-installer');
  try {
    const redux = await installExtension(REDUX_DEVTOOLS);
    console.log(`installDevTools: Installed ${redux}`);
    const react = await installExtension(REACT_DEVELOPER_TOOLS);
    console.log(`installDevTools: Installed ${react}`);
    const perf = await installExtension(REACT_PERF);
    console.log(`installDevTools: Installed ${perf}`);
  } catch (error) {
    console.warn(`installDevTools: Error occured:`, error);
  }
};
