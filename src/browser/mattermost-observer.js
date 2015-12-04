var ipc = require('ipc');

var notifyHost = function() {
  var mentionCount = getTotalMentionCount();
  var unreadCount = $('.unread-title').length;

  ipc.sendToHost('mention-count', mentionCount);
  ipc.sendToHost('unread-count', unreadCount);
};

var getTotalMentionCount = function(){
  var mentionCount = 0;
  $('.unread-title.has-badge .badge').each(function() {
    var badgeText = $(this).text();
    mentionCount += parseInt(badgeText, 10);
  });
  return mentionCount;
};

document.addEventListener("DOMContentLoaded", function() {
  // observe the DOM for mutations, specifically the .ps-container
  // which contains all the sidebar channels
  var MutationObserver = window.MutationObserver;
  var list = document.querySelector('.ps-container');

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
});
