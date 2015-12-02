var path = require('path');
var settings = require('../src/settings.js');

describe('settings', function(){

  before(function(){
    var fakeHomeDir = path.join(__dirname, './fake-home-dir');
    settings.load(fakeHomeDir);
  });

  it('reads command-line args', function(){
    //this arg is passed into the specs by mocha
    expect(settings.current()).to.have.property('reporter');
  });

  it('reads config file', function(){
    expect(settings.current()).to.have.property('configKey');
  });

  it('reads state file', function(){
    expect(settings.current()).to.have.property('teams');
    expect(settings.current().teams.active).to.have.length(2);
    expect(settings.current().window.width).to.eql('800');
  });

  it('sets config values', function(){
    settings.set("window:width", 1920);
    expect(settings.current().window.width).to.eql(1920);
  });

  it('has default values', function(){
    expect(settings.current().window.height).to.eql(600);
  });

  it('appends config values', function(){
    settings.append('teams:active', 'http://localhost/team3');
    expect(settings.current().teams.active).to.have.length(3);
  });
});
