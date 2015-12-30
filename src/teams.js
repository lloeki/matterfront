var ipcMain = require("electron").ipcMain;
var settings = require("./settings.js");

var teams = {};

teams.listen = function(){
  ipcMain.on('fetch-teams', function(event) {
    event.returnValue = settings.get("teams");
  });
};

module.exports = teams;
