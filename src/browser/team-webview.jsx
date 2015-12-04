var React = require("react");
var ReactDOM = require("react-dom");

var TeamWebview = React.createClass({
  render: function(){
    return (
      <webview
        id="mattermost-remote"
        src={this.props.teamUrl}
        partition="persist:mattermost"
        preload="mattermost-observer.js">
      </webview>
    );
  },
  componentDidMount: function(){
    this.webview = ReactDOM.findDOMNode(this);
    this.webview.addEventListener('console-message', this.onConsoleMessage);
    this.webview.addEventListener('ipc-message', this.onIPCMessage);

    //THIS MUST BE REMOVED WHEN MULTI-TEAM SUPPORT IS ADDED
    window.addEventListener('focus', this.onWindowFocus);
  },
  onConsoleMessage: function(event){
    console.info('Mattermost: ', event.message);
  },
  onIPCMessage: function(event){
    if (this.props.notifications){
      if (event.channel === "unread-count"){
        var unreadCount = parseInt(event.args[0], 10);
        this.props.notifications.setUnreadCount(unreadCount);
      }
      else if (event.channel === "mention-count"){
        var mentionCount = parseInt(event.args[0], 10);
        this.props.notifications.setMentionCount(mentionCount);
      }
    }
  },
  onWindowFocus: function(){
    this.webview.focus();
  }
});

module.exports = TeamWebview;
