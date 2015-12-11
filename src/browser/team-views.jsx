var React = require("react");
var TeamWebview = require("./team-webview.jsx");
require("./team-views.less");

var TeamViews = React.createClass({
  render: function(){
    return (
      <div className="teamViews">
        {this.renderViews()}
      </div>
    );
  },
  renderViews: function(){
    var names = Object.keys(this.props.teams);
    return names.map(this.renderView);
  },
  renderView: function(teamName){
    var team = this.props.teams[teamName];
    var isSelected = (teamName == this.props.selectedTeam);
    return (
      <TeamWebview
        teamUrl={team.url}
        teamName={team.name}
        key={team.name}
        isSelected={isSelected}
        connectionState={this.props.connectionState}
      />
    );
  }
});

module.exports = TeamViews;
