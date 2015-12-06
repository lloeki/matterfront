var remote = require('remote');
var app = remote.require('app');
var NativeImage = remote.require('native-image');

var osBadge = {};

osBadge.update = function(unreadCount) {
  var badgeText = getBadgeText(unreadCount);
  if (process.platform === 'darwin') {
    setBadgeOSX(badgeText);
  } else if (process.platform === 'win32') {
    setBadgeWindows(badgeText);
  }
};

var getBadgeText = function(unreadCount){
  if (unreadCount > 0) {
    return '●';
  } else {
    return '';
  }
};

var createBadgeImage = function(text){
  var canvas = document.createElement('canvas');
  canvas.height = 140;
  canvas.width = 140;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.ellipse(70, 70, 70, 70, 0, 0, 2 * Math.PI);
  ctx.fill();
  ctx.textAlign = 'center';
  ctx.fillStyle = 'white';

  if (text.length > 2) {
    ctx.font = 'bold 65px "Segoe UI", sans-serif';
    ctx.fillText('' + text, 70, 95);
  } else if (text.length > 1) {
    ctx.font = 'bold 85px "Segoe UI", sans-serif';
    ctx.fillText('' + text, 70, 100);
  } else {
    ctx.font = 'bold 100px "Segoe UI", sans-serif';
    ctx.fillText('' + text, 70, 105);
  }

  var badgeDataURL = canvas.toDataURL();
  var img = NativeImage.createFromDataUrl(badgeDataURL);
  return img;
};

var setBadgeOSX = function(text){
  app.dock.setBadge(text);
};

var setBadgeWindows = function(text){
  var mainWindow = remote.getCurrentWindow();
  if (text === '') {
    mainWindow.setOverlayIcon(null, '');
  } else {
    var img = createBadgeImage(text);
    mainWindow.setOverlayIcon(img, text);
  }
};

module.exports = osBadge;
