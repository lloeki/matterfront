var fs = require("fs");
var path = require("path");
var program = require("yargs");

/**
*@return array of command names
*/
var commandFiles = fs.readdirSync(__dirname + '/commands');

/**
 * @return array of command api's
 */
var loadSubCommands = function(cli){
  return commandFiles.forEach(function(command){
      // passes in the built up cli from function call to api
      // so it can be returned back assembled
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
