var ipc = require('electron').ipcRenderer;
require("./context-menu.js").load();

document.addEventListener("DOMContentLoaded", function() {
  // observe the DOM for mutations, specifically the .ps-container
  // which contains all the sidebar channels
  var MutationObserver = window.MutationObserver;
  var list = document.querySelector('.sidebar--left');

  var observer = new MutationObserver(function(mutations) {
    if (mutations.length) {
      notifyHost();
    }
  });

  if (list) {
    observer.observe(list, {
      subtree: true,
      attributes: true,
      childList: true
    });
  }

  reportThemeData();
  ipc.on("refreshThemeData", reportThemeData);
});

var notifyHost = function() {
  var mentionCount = getTotalMentionCount();
  var unreadCount = getUnreadCount();

  ipc.sendToHost('mention', mentionCount);
  ipc.sendToHost('unread', unreadCount);
};

var getUnreadCount = function(){
  return $('.unread-title').length;
};

var getTotalMentionCount = function(){
  var mentionCount = 0;
  $('.unread-title.has-badge .badge').each(function() {
    var badgeText = $(this).text();
    mentionCount += parseInt(badgeText, 10);
  });
  return mentionCount;
};

var reportThemeData = function(){
  var themeData = {
    sidebarBackground: $(".sidebar--left .team__header").css("background-color")
  };
  ipc.sendToHost('themeData', themeData);
};
