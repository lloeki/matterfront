var path = require('path');
var settings = require('../src/settings.js');

describe('settings', function(){

  before(function(){
    var fakeHomeDir = path.join(__dirname, './fake-home-dir');
    settings.load(fakeHomeDir);
  });

  it('reads command-line args', function(){
    //this arg is passed into the specs by mocha
    expect(settings.get('reporter')).to.eql('spec');
  });

  it('reads array types', function(){
    expect(settings.get('teams')).to.have.length(2);
  });

  it('reads nested objects', function(){
    expect(settings.get('window:width')).to.eql(800);
  });

  it('sets config values', function(){
    settings.set('window:width', 1920);
    expect(settings.get('window:width')).to.eql(1920);
  });

  it('has default values', function(){
    expect(settings.get('window:height')).to.eql(600);
  });

  it('appends config values', function(){
    settings.append('teams', 'http://localhost/team3');
    expect(settings.get('teams')).to.have.length(3);
  });
});
