/**
 * This module is responsible for setting, storing, and retrieving config
 * settings from the file system, Environment Variables, and CLI options
 */

 // native node modules
var fs = require("fs");
var path = require("path");

// third party modules
var nconf = require("nconf");

// local modules
var args = require("./cli.js")
