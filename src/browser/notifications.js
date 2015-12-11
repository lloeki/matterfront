var appState = require("./app-state.js");
var osBadge = require("./os-badge.js");
var osNotify = require("./os-notify.js");

var Notifications = function(){};

Notifications.prototype.setUnreadCount = function(teamName, unreadCount){
  osBadge.update(unreadCount);
  appState.setUnreadCount(teamName, unreadCount);
};

Notifications.prototype.setMentionCount = function(teamName, mentionCount){
  osNotify.update(mentionCount);
  appState.setMentionCount(teamName, mentionCount);
};

Notifications.instance = new Notifications();

module.exports = Notifications;
