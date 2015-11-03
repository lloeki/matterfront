"use strict";

var remote = require('remote');
var app = remote.require('app');

document.addEventListener('DOMContentLoaded', function() {
    var qs = window.location.search;
    var src = decodeURIComponent(qs.replace('?', '').split('&')[0].split('=')[1]);
    var webview = document.querySelector('#mattermost-remote');

    webview.setAttribute('src', src);

    var unreadCount = 0;
    var mentionCount = 0;
    var bounceId = null;
    var pendingUpdate = null;

    webview.addEventListener('ipc-message', function(event) {
        switch (event.channel) {
            case 'unread-count':
                unreadCount = parseInt(event.args[0], 10);
                break;
            case 'mention-count':
                mentionCount = parseInt(event.args[0], 10);
                break;
        }

        // if we send too many badgeUpdates, the app instantiated from the remote seems to use a
        // LIFO queue so we end up overwriting the most recent one update with an older one
        // so instead we'll wait 500ms and then if the timeout is not cancelled we'll update for real
        if (pendingUpdate) {
            clearTimeout(pendingUpdate);
        }

        pendingUpdate = setTimeout(badgeUpdate, 500);
    });

    webview.addEventListener('console-message', function(event) {
        console.log('Mattermost: ', event.message);
    });

    var badgeUpdate = function() {
        var newBadge = false;
        if (unreadCount > 0) {
            newBadge = '●';
        } else if (unreadCount == 0) {
            newBadge = '';
        }

        if (mentionCount > 0) {
            newBadge = mentionCount;
            if (bounceId) app.dock.cancelBounce(bounceId);
            bounceId = app.dock.bounce('critical');
        } else if (mentionCount == 0) {
            if (bounceId) app.dock.cancelBounce(bounceId);
        }

        if (newBadge !== false) {
            app.dock.setBadge(newBadge.toString());
        }

        pendingUpdate = null;
    };
});
