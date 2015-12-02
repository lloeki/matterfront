var ini = require('ini');
var nconf = require('nconf')
var path = require('path-extra');

var settings = {};

var getConfigPath = function(homedir){
  homedir = homedir || path.homedir();
  return path.join(homedir, '.matterfront/config.ini');
};

var getStatePath = function(homedir){
  homedir = homedir || path.homedir();
  return path.join(homedir, '.matterfront/state.ini');
};

var defaults = {
  window: {
    width: 1024,
    height: 600
  }
};

settings.load = function(homedir){
  var configPath = getConfigPath(homedir);
  var statePath = getStatePath(homedir);

  nconf.argv();
  nconf.add('config', {
    type: 'file',
    file: configPath,
    format: nconf.formats.ini
  });
  nconf.add('state', {
    type: 'file',
    file: statePath,
    format: nconf.formats.ini
  });
  nconf.defaults(defaults);
  settings._current = nconf.get();
  return settings._current;
};

settings.current = function(homedir){
  if (settings._current){
    return settings._current;
  } else {
    return settings.load(homedir);
  }
};

settings.set = function(key, value){
  nconf.set(key, value);
  settings._current = nconf.get();
  return settings._current;
};

settings.append = function(key, value){
  var array = nconf.get(key) || [];
  array.push(value);
  nconf.set(key, array);
  return settings._current;
};

settings.saveState = function(homedir){
  var statePath = getStatePath(homedir);
  var content = ini.stringify(nconf.stores.state);
  fs.writeFileSync(content, statePath);
};

module.exports = settings;
