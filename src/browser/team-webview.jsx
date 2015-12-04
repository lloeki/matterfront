var React = require("react");

var TeamWebview = React.createClass({
  render: function(){
    return (
      <webview
        id="mattermost-remote"
        src={this.props.teamUrl}
        partition="persist:mattermost"
        preload="webview.js">
      </webview>
    );
  }
});

module.exports = TeamWebview;
