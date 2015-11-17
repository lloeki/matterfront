"use strict";

const ipcRenderer = require('electron').ipcRenderer;

var mentionCount = 0;
var unreadCount = 0;

var notifyHost = function () {
  // send back the counts to the webview host
  ipcRenderer.sendToHost('mention-count', mentionCount);
  ipcRenderer.sendToHost('unread-count', unreadCount);
};

// we'll only notify if there's a change in the counts
var checkActivity = function () {
  let notify = false;
  let localMentionCount = 0;
  // get the actual count of mentions from Mattermost
  $('.unread-title.has-badge .badge').each(function () {
    localMentionCount += parseInt($(this).text(), 10);
  });

  // set flag to notify if the mention count has changed
  if (localMentionCount != mentionCount) {
    mentionCount = localMentionCount;
    notify = true;
  }

  let localUnreadCount = $('.unread-title').length;
  // set flag to notify if the unread count has changed
  if (localUnreadCount != unreadCount) {
    unreadCount = localUnreadCount;
    notify = true;
  }

  if (notify) notifyHost();
};

document.addEventListener("DOMContentLoaded", function () {
  // observe the DOM for mutations, specifically the .ps-container
  // which contains all the sidebar channels
  var MutationObserver = window.MutationObserver;
  var sidebarContainer = document.querySelector('.ps-container');

  var activityObserver = new MutationObserver(function (mutations) {
    if (mutations.length) {
      checkActivity();
    }
  });

  if (sidebarContainer) {
    activityObserver.observe(sidebarContainer, {
      subtree: true,
      attributes: true,
      childList: true
    });
  }

  // setup the mutation observer for the title
  var titleNode = document.querySelector('title');
  var titleObserver = new MutationObserver(function () {
    ipcRenderer.sendToHost('current-title', document.title);
  });

  // now watch it
  titleObserver.observe(titleNode, {
    subtree: true,
    characterData: true,
    childList: true
  });

  // initial one time notification
  checkActivity();
  ipcRenderer.sendToHost('current-title', document.title);
});
