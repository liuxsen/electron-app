const { BrowserWindow } = require('electron');
const path = require('path');
let browserWindows = [];

// 获取新建主窗口参数
const getMainWindowOptions = (width=1000, height= 670) => {
  return {
    width,
    height,
    // titleBarStyle: process.platform === 'darwin' ? 'hidden' : undefined,
    // backgroundColor: '#1d2427',
    webPreferences: {
      nodeIntegration: true
    }
  };
};

// 创建主窗口
const createMainWindow = (width = 900, height = 500, hash = '') => {
  console.log(`Creating main window`);
  const browserWindow = new BrowserWindow(getMainWindowOptions(width, height));
    browserWindow.loadURL(`http://localhost:8081/`);
    browserWindow.webContents.once('dom-ready', ()=>{
    browserWindow.show();
  });
  // 如果窗口关闭，更新保存的多个窗口数组
  browserWindow.on('closed', () => {
    browserWindows = browserWindows.filter(bw => browserWindow !== bw);
  });
  browserWindows.push(browserWindow);
  return browserWindow;
};

const getOrCreateMainWindow = () => {
  return BrowserWindow.getFocusedWindow() || browserWindows[0] || createMainWindow();
};

exports.browserWindows = browserWindows;
exports.createMainWindow = createMainWindow;
exports.getOrCreateMainWindow = getOrCreateMainWindow;