var appState = require("./app-state.js");
var React = require("react");

var TeamButton = React.createClass({
  render: function(){
    var team = this.props.team;
    var iconText = team.name.substr(0,1);
    var isSelected = (team.name === this.props.selectedTeam);
    var selectedClass = isSelected ? "selected" : "not-selected";
    return (
      <div
        className={`teamButton ${selectedClass}`}
        onClick={this.onClick}
      >
        <div className="selectionTab"></div>
        <div className="icon">{iconText}</div>
        <div className="badge unreadCount">{team.unreadCount}</div>
        <div className="badge mentionCount">{team.mentionCount}</div>
      </div>
    );
  },
  onClick: function(event){
    appState.selectTeam(this.props.team.name);
  }
});

module.exports = TeamButton;
