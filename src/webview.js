var ipc = require('ipc');

ipc.on('unread-count', function() {
    var unreadCount = $('.unread-title').length;
    ipc.sendToHost('unread-count', unreadCount);
});

ipc.on('mention-count', function() {
    var mentionCount = $('.unread-title .badge').length;
    ipc.sendToHost('mention-count', mentionCount);
});
