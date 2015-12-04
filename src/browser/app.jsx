var React = require("react");
var TeamWebview = require("./team-webview.jsx");

var App = React.createClass({
  render: function(){
    return (
      <div>
        <TeamWebview teamUrl={this.props.teamUrl}/>
        <div id='overlay'></div>
      </div>
    );
  }
});

module.exports = App;
