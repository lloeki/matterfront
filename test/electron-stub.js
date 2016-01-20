/**
 * Returns a partial stub of the electron api.
 */
function create() {
  return {
    app: {
      getName: function() {}
    },

    ipcMain: {
      on: function() {}
    },

    nativeImage : {
      'createFromPath': function() {
        return {};
      }
    },

    Tray: function() {
      var Tray = function() {};
      Tray.prototype.setToolTip = function() {};
      Tray.prototype.setContextMenu = function() {};
      Tray.prototype.on = function() {};
      return Tray;
    }(),

    Menu: function() {
      var Menu = function() {};
      Menu.prototype.append = function() {};
      return Menu;
    }(),

    MenuItem: function() {}
  }
}

module.exports = {
  create: create
};
