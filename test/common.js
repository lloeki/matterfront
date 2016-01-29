var chai = require("chai");
var chaiJq = require("chai-jq");
chai.use(chaiJq);
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

global.expect = chai.expect;

require.extensions[".less"] = function(module, filename){
  return "";
};

require.extensions[".css"] = function(module, filename){
  return "";
};

require("babel-register")({
  presets: ["react"]
});

global.razz = require("razz");
razz.init();

var Zepto = require("zepto-node");
global.$ = Zepto(window);
