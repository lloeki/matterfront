var appState = require("./app-state.js");
var React = require("react");
var TeamButtons = require("./team-buttons.jsx");
var TeamViews = require("./team-views.jsx");

var App = React.createClass({
  componentDidMount: function(){
    var appStream = appState.initStream();
    appStream.onValue(this.setState.bind(this));
  },
  getInitialState: function(){
    return appState.initialState;
  },
  render: function(){
    return (
      <div className="app">
        <TeamButtons {...this.state} />
        <TeamViews {...this.state} />
      </div>
    );
  }
});

module.exports = App;
