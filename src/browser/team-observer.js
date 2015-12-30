var appState = require("./app-state.js");
var ipcRenderer = require('electron').ipcRenderer;

var teamObserver = {};

teamObserver.start = function(){
  var teams = ipcRenderer.sendSync("fetch-teams");
  teams.forEach(appState.addTeam);
};

module.exports = teamObserver;
