var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var path = require('path');
var fs = require('fs');
// Report crashes to our server.

require('crash-reporter').start();

// Load persisted state.
var state = {};
var statePath = path.join(app.getDataPath(), "state.json");
try {
  state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
} catch(e) {
  // Ignore non-existing file, but log any other error.
  if (e instanceof Error && e.code === 'ENOENT') {
    console.log(statePath + ' not found. Defaults for the window state will be used.');
  } else {
    console.error('Error loading ' + statePath + ': ', e);
  }
}
// Defaults.
if (state.winOptions === undefined) {
  state.winOptions = {width: 1024, height: 600};
  console.log('Using default window options: ', state.winOptions);
}

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
  mainWindow = new BrowserWindow(state.winOptions);
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
    // Persist state.
    state.winOptions.fullscreen = mainWindow.isFullScreen();
    if (!mainWindow.isFullScreen()) {
      var bounds = mainWindow.getBounds();
      state.winOptions.x = bounds.x;
      state.winOptions.y = bounds.y;
      state.winOptions.width = bounds.width;
      state.winOptions.height = bounds.height;
    }
    fs.writeFileSync(statePath, JSON.stringify(state));

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

  require('./menu.js');
});
