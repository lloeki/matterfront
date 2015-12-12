var appState = require("./app-state.js");
var mattermostEvents = require("./mattermost-events.js");
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
  componentWillReceiveProps: function(newProps){
    // we risk a render loop if we force
    // a refresh every time we receive props
    if (!this.props.isSelected && newProps.isSelected){
      this.needsThemeRefresh = true;
    }
  },
  componentDidUpdate: function(){
    if (this.refs.webview){
      this.refs.webview.addEventListener('dom-ready', this.onDomReady);
      this.refs.webview.addEventListener('console-message', this.onConsoleMessage);
      this.refs.webview.addEventListener('ipc-message', this.onIPCMessage);
      this.refs.webview.addEventListener('new-window', this.onNewWindow);
      window.addEventListener('focus', this.onWindowFocus);

      if (this.needsThemeRefresh && this.props.isSelected && this.refs.webview.send){
        this.refs.webview.send("refreshThemeData");
        this.needsThemeRefresh = false;
      }
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
    event.teamName = this.props.teamName;
    mattermostEvents.process(event);
  },
  onWindowFocus: function(){
    if (this.props.isSelected){
      this.refs.webview.focus();
    }
  }
});

module.exports = TeamWebview;
