var remote = require('remote');
var app = remote.require('app');
var NativeImage = remote.require('native-image');
var mainWindow = remote.getCurrentWindow();

document.addEventListener('DOMContentLoaded', function() {
  var webview = document.querySelector('#mattermost-remote');
  var unreadCount = 0;
  var mentionCount = 0;
  var bounceId = null;
  var pendingUpdate = null;

  webview.addEventListener('ipc-message', function(event) {
    switch (event.channel) {
    case 'unread-count':
      unreadCount = parseInt(event.args[0], 10);
      break;
    case 'mention-count':
      mentionCount = parseInt(event.args[0], 10);
      break;
    }

    // if we send too many badgeUpdates, the app instantiated from the remote seems to use a
    // LIFO queue so we end up overwriting the most recent one update with an older one
    // so instead we'll wait 500ms and then if the timeout is not cancelled we'll update for real
    if (pendingUpdate) {
      clearTimeout(pendingUpdate);
    }

    pendingUpdate = setTimeout(badgeUpdate, 500);
  });

  webview.addEventListener('console-message', function(event) {
    console.log('Mattermost: ', event.message);
  });

  // Keep the focus on the webview.
  // Without this, the webview loses focus when switching to another app and back.
  window.addEventListener('focus', function(e) {
    webview.focus();
  });

  var badgeUpdate = function() {
    var newBadge = false;
    if (unreadCount > 0) {
      newBadge = '●';
    } else if (unreadCount == 0) {
      newBadge = '';
    }

    if (mentionCount > 0) {
      newBadge = mentionCount;
      notifyOS(true);
    } else if (mentionCount == 0) {
      notifyOS(false);
    }

    if (newBadge !== false) {
      setBadge(newBadge);
    }

    pendingUpdate = null;
  };

  var notifyOS = function(flag) {
    if (process.platform === 'darwin') {
      if (bounceId) app.dock.cancelBounce(bounceId);
      if (flag) {
        bounceId = app.dock.bounce('critical');
      }
    } else if (process.platform === 'win32') {
      mainWindow.flashFrame(flag)
    }
  };

  var setBadge = function (text) {
    text = text.toString();
    if (process.platform === 'darwin') {
      app.dock.setBadge(text);
    } else if (process.platform === 'win32') {
      if (text === '') {
        mainWindow.setOverlayIcon(null, '');
        return;
      }

      // Create badge
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

      mainWindow.setOverlayIcon(img, text);
    }
  };
});
