var remote = require('remote');
var app = remote.require('app');

document.addEventListener('DOMContentLoaded', function() {
    var qs = window.location.search;
    var src = decodeURIComponent(qs.replace('?', '').split('&')[0].split('=')[1]);
    var webview = document.querySelector('#mattermost-remote');

    webview.setAttribute('src', src);

    var badgeUpdateTimer = setInterval(function() {
        webview.send('unread-count');
        webview.send('mention-count');
    }, 1000);

    var unreadCount = 0;
    var mentionCount = 0;

    webview.addEventListener('ipc-message', function(event) {
        switch (event.channel) {
            case 'unread-count':
                unreadCount = event.args[0];
                break;
            case 'mention-count':
                mentionCount = event.args[0];
                break;
        }

        badgeUpdate(unreadCount, mentionCount);
    });

    var badgeUpdate = function(unreadCount, mentionCount) {
        var newBadge = false;
        if (unreadCount > 0) {
            newBadge = '●';
        } else if (unreadCount == 0) {
            newBadge = '';
        }

        if (mentionCount > 0) {
            newBadge = mentionCount;
            app.dock.bounce('critical');
        }

        if (newBadge !== false) {
            app.dock.setBadge(newBadge.toString());
        }
    };
});
