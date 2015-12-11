var appState = require("./app-state.js");
var React = require("react");

var TeamButton = React.createClass({
  render: function(){
    var team = this.props.team;
    var iconText = team.name.substr(0,1);
    var isSelected = (team.name === this.props.selectedTeam);
    var selectedClass = isSelected ? "selected" : "not-selected";
    var unreadCount = this.processCount(team.unreadCount);
    var mentionCount = this.processCount(team.mentionCount);
    return (
      <div
        className={`teamButton ${selectedClass}`}
        onClick={this.onClick}
      >
        <div className="selectionTab"></div>
        <div className="icon">{iconText}</div>
        <div
          className={`badge unreadCount count-${unreadCount}`}
          title="Number of Unread Messages"
        >{unreadCount}</div>
        <div
          className={`badge mentionCount count-${mentionCount}`}
          title="Number of Times Mentioned"
        >{mentionCount}</div>
      </div>
    );
  },
  onClick: function(event){
    appState.selectTeam(this.props.team.name);
  },
  processCount: function(count){
    if (count < 100){
      return count;
    } else {
      return "*";
    }
  }
});

module.exports = TeamButton;
