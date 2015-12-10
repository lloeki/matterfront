var appState = require("./app-state.js");
var notifications = require("./notifications.js").instance;
var Overlay = require("./overlay.jsx");
var React = require("react");
var ReactDOM = require("react-dom");
var shell = require("shell");
require("./team-webview.less");

var TeamWebview = React.createClass({
  render: function(){
    if (this.props.teamUrl){
      return this.renderTeam();
    } else {
      return this.renderWaiting();
    }
  },
  renderTeam: function(){
    var selectedClass = this.props.isSelected ? "selected" : "not-selected";
    return (
      <div className={`teamWebview ${selectedClass}`}>
        <Overlay connectionState={this.props.connectionState}/>
        <webview
          className="mattermost-remote"
          ref="webview"
          src={this.props.teamUrl}
          partition="persist:mattermost"
          preload="mattermost-observer.js">
        </webview>
      </div>
    );
  },
  renderWaiting: function(){
    return (<div>Waiting for team...</div>);
  },
  componentDidUpdate: function(){
    if (this.refs.webview){
      this.refs.webview.addEventListener('dom-ready', this.onDomReady);
      this.refs.webview.addEventListener('console-message', this.onConsoleMessage);
      this.refs.webview.addEventListener('ipc-message', this.onIPCMessage);
      this.refs.webview.addEventListener('new-window', this.onNewWindow);
      window.addEventListener('focus', this.onWindowFocus);
    }
  },
  onDomReady: function(){
    appState.setConnectionState("online");
  },
  onNewWindow: function(event){
    shell.openExternal(event.url);
  },
  onConsoleMessage: function(event){
    console.info('Mattermost: ', event.message);
  },
  onIPCMessage: function(event){
    if (this.props.notifications){
      if (event.channel === "unread-count"){
        var unreadCount = parseInt(event.args[0], 10);
        notifications.setUnreadCount(unreadCount);
      }
      else if (event.channel === "mention-count"){
        var mentionCount = parseInt(event.args[0], 10);
        notifications.setMentionCount(mentionCount);
      }
    }
  },
  onWindowFocus: function(){
    if (this.props.isSelected){
      this.refs.webview.focus();
    }
  }
});

module.exports = TeamWebview;
