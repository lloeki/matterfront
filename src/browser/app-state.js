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
  team.unreadCount = 0;
  team.mentionCount = 0;
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
};

var onSetUnreadCount = function(currentState, event){
  currentState.teams[event.teamName].unreadCount = event.unreadCount;
  return currentState;
};

var onSetMentionCount = function(currentState, event){
  currentState.teams[event.teamName].mentionCount = event.mentionCount;
  return currentState;
};

appState.setConnectionState = function(connectionState){
  d.push("setConnectionState", connectionState);
};

appState.addTeam = function(team){
  d.push("addTeam", team);
};

appState.selectTeam = function(teamName){
  d.push("selectTeam", teamName);
};

appState.setUnreadCount = function(teamName, unreadCount){
  d.push("setUnreadCount", {
    teamName:teamName,
    unreadCount:unreadCount
  });
};

appState.setMentionCount = function(teamName, mentionCount){
  d.push("setMentionCount", {
    teamName:teamName,
    mentionCount:mentionCount
  });
};

appState.initStream = function(){
  var setConnectionStateStream = d.stream("setConnectionState");
  var addTeamStream = d.stream("addTeam");
  var selectTeamStream = d.stream("selectTeam");
  var setUnreadCountStream = d.stream("setUnreadCount");
  var setMentionCountStream = d.stream("setMentionCount");

  var fullStream = Bacon.update(
    appState.initialState,
    [setConnectionStateStream], onSetConnectionState,
    [addTeamStream], onAddTeam,
    [selectTeamStream], onSelectTeam,
    [setUnreadCountStream], onSetUnreadCount,
    [setMentionCountStream], onSetMentionCount
  );
  return fullStream;
};

module.exports = appState;
