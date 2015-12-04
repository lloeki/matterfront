var remote = require('remote');
var app = remote.require('app');

var bounceId;

var osNotify = {};

osNotify.update = function(mentionCount) {
  var doNotify = (mentionCount > 0);
  if (process.platform === 'darwin') {
    notifyOSX(doNotify);
  } else if (process.platform === 'win32') {
    notifyWindows(doNotify);
  }
};

var notifyOSX = function(doNotify){
  if (bounceId) {
    app.dock.cancelBounce(bounceId);
  }
  if (doNotify) {
    bounceId = app.dock.bounce('critical');
  }
};

var notifyWindows = function(doNotify){
  var mainWindow = remote.getCurrentWindow();
  mainWindow.flashFrame(doNotify)
};

module.exports = osNotify;
