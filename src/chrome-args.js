var app = require('app');

var chromeArgs = {};

chromeArgs.apply = function(settings){
  var chromeArgs = settings.get('chrome-args');
  Object.keys(chromeArgs).forEach(function(key){
    var chromeArg = chromeArgs[key];
    app.commandLine.appendSwitch(key, chromeArg);
  });
};

module.exports = chromeArgs;
