var appState = require("./app-state.js");

var connectionObserver = {};

var onOnline = function(){
  appState.setConnectionState("online");
};

var onOffline = function(){
  appState.setConnectionState("offline");
};

connectionObserver.start = function(){
  window.addEventListener("online", onOnline);
  window.addEventListener("offline", onOffline);

  if (navigator.online){
    appState.setConnectionState("online");
  } else {
    appState.setConnectionState("offline");
  }
};

module.exports = connectionObserver;
