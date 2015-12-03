
var Menu = require('menu');
var menuTemplate = require("./menu-template.js");

menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);
