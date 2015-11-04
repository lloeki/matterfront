var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var path = require('path');
var fs = require('fs');
// Report crashes to our server.

require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  var quitting = false;
  mainWindow = new BrowserWindow({width: 1024, height: 600});
  var config = {};
  var configPaths = [
    path.join('.', 'config.json'),
    path.join(app.getPath('userData'), 'config.json'),
    path.join(app.getAppPath(), 'config.json'),
  ];
  for (var i = 0; i < configPaths.length; i++) {
    try {
      config = JSON.parse(fs.readFileSync(configPaths[i]));
      break;
    } catch(e) {
      if (e instanceof Error && e.code === 'ENOENT') {
        // next
      } else { throw e; }
    }
  }

  var src = config['url'] || 'file://' + __dirname + '/nosrc.html';

  mainWindow.loadUrl('file://' + __dirname + '/index.html' + '?src=' + encodeURIComponent(src));

  app.on('activate', function(e, hasVisibleWindows) {
    if (hasVisibleWindows) {
      mainWindow.focus();
    } else {
      if (mainWindow == null) {
        mainWindow = new BrowserWindow({width: 1024, height: 600});
      } else {
        mainWindow.show();
      }
    }
  });

  app.on('before-quit', function(e) {
    quitting = true;
  });

  mainWindow.on('close', function(e) {
    if (process.platform != 'darwin') { return; }
    if (quitting) { return; }

    e.preventDefault();
    mainWindow.hide();
  });

  mainWindow.webContents.on('will-navigate', function (e) {
      e.preventDefault();
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
