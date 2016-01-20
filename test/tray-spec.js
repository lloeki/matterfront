var sinon = require("sinon");
var proxyquire = require("proxyquire").noPreserveCache().noCallThru();
var electronStub = require("./electron-stub.js");

describe('tray', function() {

  var electron;
  var trayModule;

  beforeEach(function() {
    electron = electronStub.create();
    electron.Tray = sinon.spy(electron.Tray);
  });

  it('is initially disabled', function() {
    trayModule = proxyquire('../src/tray.js', {electron: electron});
    expect(electron.Tray).to.not.have.been.called;
    expect(trayModule.isEnabled()).to.be.false;
  });

  it('creates a tray icon on enable()', function() {
    trayModule = proxyquire('../src/tray.js', {electron: electron});
    trayModule.enable({});
    expect(electron.Tray).to.have.been.calledOnce;
    expect(trayModule.isEnabled()).to.be.true;
  });

  it('sets a tooltip for the tray icon', function() {
    electron.app.getName = function() {return "foo";}
    electron.Tray.prototype.setToolTip = sinon.spy();
    trayModule = proxyquire('../src/tray.js', {electron: electron});

    trayModule.enable({});
    expect(electron.Tray.prototype.setToolTip).to.have.been.calledOnce;
    expect(electron.Tray.prototype.setToolTip).to.have.been.calledWith("foo");
  });

});
