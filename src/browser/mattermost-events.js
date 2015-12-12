var appState = require("./app-state.js");
var notifications = require("./notifications.js").instance;
var mattermostEvents = {};

mattermostEvents.process_unread = function(event){
  var unreadCount = parseInt(event.args[0], 10) || 0;
  notifications.setUnreadCount(event.teamName, unreadCount);
};

mattermostEvents.process_mention = function(event){
  var mentionCount = parseInt(event.args[0], 10) || 0;
  notifications.setMentionCount(event.teamName, mentionCount);
};

mattermostEvents.process_themeData = function(event){
  var themeData = event.args[0];
  appState.setThemeData(event.teamName, themeData);
};

mattermostEvents.process = function(event){
  var methodName = "process_" + event.channel;
  mattermostEvents[methodName](event);
};

module.exports = mattermostEvents;
