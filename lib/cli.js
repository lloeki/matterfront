var fs = require("fs");
var path = require("path");
var program = require("yargs");

    /**
    *@return array of command names
    */
    var commandFiles = fs.readdirSync(__dirname + '/commands');

// appends each command to the cli
var loadSubCommands = function(cli){
  return commandFiles.forEach(function(command){
      require(__dirname + '/commands/'+ command)(cli);
    });
}

module.exports = function(){

  /**
  * global cli options are set on the `program` prior to loading commandFiles
  */
  program
    .usage("mattermost <command> [options]")
    .help('h');

  /**
  * appends the entire api cli for each command to the program
  * described so far
  */
  loadSubCommands(program);

  return program;
};
