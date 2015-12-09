var appState = require("./app-state.js");
var qs = require("qs");

var teamObserver = {};

teamObserver.start = function(){
  var queryString = qs.parse(window.location.search.slice(1));
  var teamUrl = queryString.teamUrl;
  appState.setTeamUrl(teamUrl);
};

module.exports = teamObserver;
