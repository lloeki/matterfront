var remote = require('remote');
var Menu = remote.require('menu');
var template = require("./context-menu-template.js");

var menu = {};

menu.load = function(){
  console.log("context-menu load() called");
  var contextMenu = Menu.buildFromTemplate(template);
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    contextMenu.popup(remote.getCurrentWindow());
  }, false);
};

module.exports = menu;
