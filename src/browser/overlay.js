document.addEventListener('DOMContentLoaded', function() {
  var overlay = document.querySelector('#overlay');
  var webview = document.getElementById("mattermost-remote");

  webview.addEventListener('dom-ready', function() {
    if (navigator.onLine) {
      overlay.style['opacity'] = 0;
      overlay.style['z-index'] = -1;
    }
  });
  var handleOnline = function(first) {
    if (navigator.onLine) {
      // TODO: add spinner/connecting icon
      if (first) {
        console.log('connecting');
      } else {
        console.log('reconnecting');
        setTimeout(function() { webview.reload(); }, 500);
      }
    } else {
      // TODO: add offline/unplugged icon
      console.log('disconnected');
      overlay.style['opacity'] = 0.5;
      overlay.style['z-index'] = 100;
    }
  };

  window.addEventListener('online', function() { handleOnline(false) } );
  window.addEventListener('offline', function() { handleOnline(false) } );

  handleOnline(true);
});
