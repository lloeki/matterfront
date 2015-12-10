var Bacon = require("baconjs");
var Dispatcher = require("bacon-dispatcher");
var d = new Dispatcher();

var appState = {};

appState.initialState = {
  connectionState: "offline",
  teams: {},
  selectedTeam: ""
};

var onSetConnectionState = function(currentState, connectionState){
  currentState.connectionState = connectionState;
  return currentState;
};

var onAddTeam = function(currentState, team){
  currentState.teams[team.name] = team;
  var isFirstTeam = (Object.keys(currentState.teams).length === 1);
  var noneSelected = (currentState.selectedTeam === "");
  if (isFirstTeam && noneSelected) {
    appState.selectTeam(team.name);
  }
  return currentState;
};

var onSelectTeam = function(currentState, teamName){
  currentState.selectedTeam = teamName;
  return currentState;
}

appState.setConnectionState = function(connectionState){
  d.push("setConnectionState", connectionState);
};

appState.addTeam = function(team){
  d.push("addTeam", team);
};

appState.selectTeam = function(teamName){
  d.push("selectTeam", teamName);
};

appState.initStream = function(){
  var setConnectionStateStream = d.stream("setConnectionState");
  var addTeamStream = d.stream("addTeam");
  var selectTeamStream = d.stream("selectTeam");

  var fullStream = Bacon.update(
    appState.initialState,
    [setConnectionStateStream], onSetConnectionState,
    [addTeamStream], onAddTeam,
    [selectTeamStream], onSelectTeam
  );
  return fullStream;
};

module.exports = appState;
