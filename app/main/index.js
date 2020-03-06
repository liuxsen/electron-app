// require('./event');

const { getOrCreateMainWindow } = require('./windows');
const { setupDevTools } = require('./devtools');
const { app } = require('electron');

const onReady = async () => {
  getOrCreateMainWindow();
  setupDevTools();
};

function main(){
  app.on('ready', onReady);
}

main();
