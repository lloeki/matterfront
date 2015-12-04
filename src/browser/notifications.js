var osBadge = require("./os-badge.js");
var osNotify = require("./os-notify.js");

var Notifications = function(){
  this.unreadCount = 0;
  this.mentionCount = 0;
};

Notifications.prototype.setUnreadCount = function(unreadCount){
  this.unreadCount = unreadCount;
  this.update();
};

Notifications.prototype.setMentionCount = function(mentionCount){
  this.mentionCount = mentionCount;
  this.update();
};

Notifications.prototype.update = function(){
  osBadge.update(this.unreadCount);
  osNotify.update(this.mentionCount);
};

module.exports = Notifications;
