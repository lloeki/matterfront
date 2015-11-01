document.addEventListener('DOMContentLoaded', function() {
    var qs = window.location.search
    var src = decodeURIComponent(qs.replace('?', '').split('&')[0].split('=')[1]);
    document.querySelector('#mattermost-remote').setAttribute('src', src);
});
