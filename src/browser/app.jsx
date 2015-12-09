var appState = require("./app-state.js");
var React = require("react");
var TeamWebview = require("./team-webview.jsx");

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
      <div>
        <TeamWebview {...this.state}/>
      </div>
    );
  }
});

module.exports = App;
