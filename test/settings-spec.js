var path = require('path');
var settings = require('../src/settings.js');

describe('settings', function(){
  describe('without config but state', function(){
    before(function(){
      var fakeApp = path.join(__dirname, '.');
      var fakeUserData = path.join(__dirname, './fake-userdata');
      settings.load(fakeApp, fakeUserData);
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

  describe('with config but no state', function(){
    before(function(){
      var fakeApp = path.join(__dirname, './fake-app');
      var fakeUserData = path.join(__dirname, './');
      settings.load(fakeApp, fakeUserData);
    });

    it('reads command-line args', function(){
      //this arg is passed into the specs by mocha
      expect(settings.get('reporter')).to.eql('spec');
    });

    it('reads array types', function(){
      expect(settings.get('teams')).to.have.length(2);
    });

    it('reads nested objects', function(){
      expect(settings.get('window:height')).to.eql(1024);
    });

    it('sets config values', function(){
      settings.set('window:height', 1920);
      expect(settings.get('window:height')).to.eql(1920);
    });

    it('has default values', function(){
      expect(settings.get('window:width')).to.eql(1024);
    });

    it('appends config values', function(){
      settings.append('teams', 'http://localhost/team3');
      expect(settings.get('teams')).to.have.length(3);
    });
  });

  describe('with config and state', function(){
    before(function(){
      var fakeApp = path.join(__dirname, './fake-app');
      var fakeUserData = path.join(__dirname, './fake-userdata');
      settings.load(fakeApp, fakeUserData);
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
      expect(settings.get('window:height')).to.eql(1024);
    });

    it('sets config values', function(){
      settings.set('window:width', 1920);
      expect(settings.get('window:width')).to.eql(1920);
    });

    it('appends config values', function(){
      settings.append('teams', 'http://localhost/team3');
      expect(settings.get('teams')).to.have.length(3);
    });

    it('reads non-state settings from `config.json`', function(){
      expect(settings.get('chrome-args')).to.have.property("some-arg-name", "some-arg-value");
    });
  });
});
