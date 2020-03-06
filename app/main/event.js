// 事件监听
const Electron = require('electron');
const ipcMain = Electron.ipcMain;
const { browserWindows } = require('./windows');
const appData = {
  profile: {}
};

ipcMain.on('loginSuccess', (event, arg)=>{
  console.log('[main]-loginsuccess', arg);
  appData.profile = arg;
  if(browserWindows[0]){
    browserWindows[0].webContents.send('loginSuccess', arg);
  }
});