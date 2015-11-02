#! /usr/bin/env node
var nconf = require('nconf');

var matterfront = {};
matterfront.opts = nconf.argv()
	.env()
	.file('../matterfront.json');


module.exports = matterfront;
