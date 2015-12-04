var React = require("react");

var App = React.createClass({
  render: function(){
    //These will be converted to React components
    return (
      <div>
        <webview id='mattermost-remote' src partition='persist:mattermost' preload="webview.js"></webview>
        <div id='overlay'></div>
      </div>
    );
  }
});

module.exports = App;
