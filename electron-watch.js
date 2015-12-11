var chokidar = require("chokidar");
var electronConnect = require("electron-connect");
var once = require("lodash.once");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");

webpackConfig.entry.push("./src/browser/dev-mode.js");
webpackConfig.devtool = "source-map";

var compiler = webpack(webpackConfig);
var webpackWatcher = compiler.watch({}, function(err, stats){
  if (err){
    console.error("webpack error:", err);
  } else if (stats.compilation.errors && stats.compilation.errors.length){
     console.error("webpack errors:")
     stats.compilation.errors.forEach(function(error){
       console.error(error.message);
     });
  }else {
    startAppOnFirstRun();
    var elapsed = stats.endTime - stats.startTime;
    console.info("\n\nwebpack success:", elapsed + "ms");
  }
});

var startApp = function(){
  var electron = electronConnect.server.create();
  electron.start("--dev-mode");

  var bundleWatcher = chokidar.watch("./browser-build/bundle.js");
  bundleWatcher.on("change", function(){
    console.info("Reloading renderer.")
    electron.reload();
  });

  var mainProcessWatcher = chokidar.watch("./src/", {
    depth: 0
  });
  mainProcessWatcher.on("change", function(){
    console.info("Reloading main process.");
    electron.restart("--dev-mode");
  });

  electron.on("exit", function(){
    console.info("Stopping main process.");
    electron.stop();
    console.info("Stopping watchers.");
    bundleWatcher.close();
    mainProcessWatcher.close();
    webpackWatcher.close(function(){
      console.info("Watchers closed. Exiting.");
      process.exit(0);
    });
  });
};

var startAppOnFirstRun = once(startApp);
