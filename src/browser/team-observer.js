var appState = require("./app-state.js");
//ipc is deprecated, but we can't switch to `require("electron")` until
//the webpack target is updated to side-step `electron`. :frowning:
var ipcRenderer = require('electron').ipcRenderer;

var teamObserver = {};

teamObserver.start = function(){
  var teams = ipcRenderer.sendSync("fetch-teams");
  teams.forEach(appState.addTeam);
};

module.exports = teamObserver;
