var appState = require("./app-state.js");
var React = require("react");
require("./team-buttons.less");

var TeamButtons = React.createClass({
  render: function(){
    return (
      <div className="teamButtons">
        {this.renderButtons()}
      </div>
    );
  },
  renderButtons: function(){
    var names = Object.keys(this.props.teams);
    return names.map(this.renderButton);
  },
  renderButton: function(teamName){
    var iconText = teamName.substr(0,1);
    var isSelected = (teamName === this.props.selectedTeam);
    var selectedClass = isSelected ? "selected" : "not-selected";
    return (
      <div
        className={`teamButton ${selectedClass}`}
        key={teamName}
        onClick={this.onClick}
        data-teamname={teamName}>
        {iconText}
      </div>
    );
  },
  onClick: function(event){
    var teamName = event.target.dataset.teamname;
    appState.selectTeam(teamName);
  }
});

module.exports = TeamButtons;
