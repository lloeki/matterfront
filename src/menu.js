var Menu = require('menu');
var menuTemplate = require("./menu-template.js");

var menu = {};

menu.load = function(){
  appMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(appMenu);
};

module.exports = menu;
