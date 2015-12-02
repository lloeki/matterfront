document.addEventListener('DOMContentLoaded', function() {
  var webview = document.getElementById("mattermost-remote");
  webview.addEventListener('new-window', function(e) {
    require('shell').openExternal(e.url);
  });
});
