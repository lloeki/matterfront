var Bacon = require("baconjs");
var Dispatcher = require("bacon-dispatcher");
var d = new Dispatcher();

var appState = {};

appState.initialState = {
  "connectionState": "offline"
};

var onSetConnectionState = function(currentState, connectionState){
  currentState.connectionState = connectionState;
  return currentState;
};

var onSetTeamUrl = function(currentState, teamUrl){
  currentState.teamUrl = teamUrl;
  return currentState;
};

appState.setConnectionState = function(connectionState){
  d.push("setConnectionState", connectionState);
};

appState.setTeamUrl = function(teamUrl){
  d.push("setTeamUrl", teamUrl);
};

appState.initStream = function(){
  var setConnectionStateStream = d.stream("setConnectionState");
  var setTeamUrlStream = d.stream("setTeamUrl");

  var fullStream = Bacon.update(
    appState.initialState,
    [setConnectionStateStream], onSetConnectionState,
    [setTeamUrlStream], onSetTeamUrl
  );
  return fullStream;
};

module.exports = appState;
