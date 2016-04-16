var remote = require('remote');
var Menu = remote.require('menu');
var template = require("./context-menu-template.js");

var menu = {};

menu.load = function(){
  var contextMenu = Menu.buildFromTemplate(template);
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    contextMenu.popup(remote.getCurrentWindow());
  }, false);
};

module.exports = menu;
