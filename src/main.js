var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var chromeArgs = require('./chrome-args.js');
var menu = require('./menu.js');
var settings = require('./settings.js');
var teams = require("./teams.js");
var tray = require("./tray.js");

settings.load();
chromeArgs.apply(settings);
teams.listen();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  var quitting = false;
  mainWindow = new BrowserWindow(settings.get('window'));

  var indexPath = `file://${__dirname}/browser/index.html`;
  mainWindow.loadURL(indexPath);

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
    settings.set('window:fullscreen', mainWindow.isFullScreen());
    if (!mainWindow.isFullScreen()) {
      var bounds = mainWindow.getBounds();
      settings.set('window:x', bounds.x);
      settings.set('window:y', bounds.y);
      settings.set('window:width', bounds.width);
      settings.set('window:height', bounds.height);
    }
    settings.saveState();

    // Quit when the window is closed if not on OS X or if the tray icon is disabled.
    if (process.platform != 'darwin' && !tray.isEnabled()) {
      return;
    }

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

  menu.load();

  // Show a system tray/menu bar icon if enabled in the settings.
  if (settings.get('showTrayIcon') === true) {
    tray.enable(mainWindow);
  }

});
