var React = require("react");
var TeamButton = require("./team-button.jsx");
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
    var team = this.props.teams[teamName];
    return (
      <TeamButton team={team} key={teamName} selectedTeam={this.props.selectedTeam}/>
    );
  }
});

module.exports = TeamButtons;
