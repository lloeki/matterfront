var electron = require('electron');
var Menu = electron.Menu;
var MenuItem = electron.MenuItem;
var Tray = electron.Tray;
var nativeImage = electron.nativeImage;
var ipc = electron.ipcMain;
var app = require('app');
var path = require('path');

var defaultIcon = nativeImage.createFromPath(
  path.join(__dirname, '../resources/tray.png'));
var unreadMessagesIcon = nativeImage.createFromPath(
    path.join(__dirname, '../resources/tray-unread.png'));
var mentionsIcon = nativeImage.createFromPath(
      path.join(__dirname, '../resources/tray-mention.png'));

var tray;
var mainWindow;

var unreadCount = 0;
var mentionsCount = 0;

function createMenu() {
  var menu = new Menu();

  menu.append(new MenuItem({
    label: 'Show',
    click: function(item) {
      mainWindow.restore();
      mainWindow.show();
    }
  }));
  menu.append(new MenuItem({
    label: 'Quit',
    click: function(item) {
      app.quit();
    }
  }));

  return menu;
}

function updateIcon() {
  if (mentionsCount > 0) {
    tray.setImage(mentionsIcon);
  } else if (unreadCount > 0) {
    tray.setImage(unreadMessagesIcon);
  } else {
    tray.setImage(defaultIcon);
  }
}

function handleUnreadChange(event, arg) {
  if (arg !== unreadCount) {
    unreadCount = arg;
    updateIcon();
  }
}

function handleMentionsChange(event, arg) {
  if (arg !== mentionsCount) {
    mentionsCount = arg;
    updateIcon();
  }
}

// Shows the tray icon.
function enable(mainBrowserWindow) {
  mainWindow = mainBrowserWindow;

  tray = new Tray(defaultIcon);
  tray.setToolTip(app.getName());

  var tray_menu = createMenu();
  tray.setContextMenu(tray_menu);

  tray.on('click', function() {
    mainBrowserWindow.restore();
    mainBrowserWindow.show();
  });

  ipc.on('mention', handleMentionsChange);
  ipc.on('unread', handleUnreadChange);
}


module.exports = {
  enable: enable
};
