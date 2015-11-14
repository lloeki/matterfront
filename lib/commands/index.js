var fs = require("fs");
var path = require("path");

// load commands
var commandFiles = fs.readdirSync(__dirname);

var subCommands = {};

/**
*@return array of command names
*/
subCommands.commands = fs.readdirSync(__dirname)
  .map(function(file){
    return file.split(path.extname(file)).shift();
  })
  .filter(function(commandName){
    return commandName != 'index'; 
  })

module.exports = subCommands;
