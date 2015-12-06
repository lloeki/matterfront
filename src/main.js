var app = require('app');
var BrowserWindow = require('browser-window');
var menu = require('./menu.js');
var path = require('path');
var settings = require('./settings.js');

require('crash-reporter').start();

settings.load();

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

var getFirstTeam = function(){
  var teams = settings.get('teams');
  if (Array.isArray(teams) && teams.length > 0){
    return teams[0];
  } else {
    var noTeamsPath = path.join('file://', __dirname, 'browser/nosrc.html');
    return noTeamsPath;
  }
};

app.on('ready', function() {
  var quitting = false;
  mainWindow = new BrowserWindow(settings.get('window'));

  var team = getFirstTeam();
  var teamUrl = encodeURIComponent(team.url);
  var indexPath = path.join('file://', __dirname, 'browser/index.html');
  mainWindow.loadURL(indexPath + '?teamUrl=' + teamUrl);

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

  menu.load();
});
