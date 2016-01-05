var TeamButtons = require("../../src/browser/team-buttons.jsx");

describe("TeamButtons", function(){

  var state = {
        connectionState: "online",
        selectedTeam: "dev",
        teams: {
          dev: {
            mentionCount: 0,
            name: "dev",
            themeData: {
              sidebarBackground: "rgb(47, 129, 183)"
            },
            unreadCount: 0,
            url: "http://matterfront/local-dev"
          }
        }
      };

  it ("adds hide class when it has only one team", function(){
    var el = $(razz.render(TeamButtons, state)).children().first();
    expect(el).to.have.$attr("class", "teamButtons hideTeamButtons");
  });

  it ("does not add hide class when it has multiple teams", function(){
    var el = $(razz.render(TeamButtons, state)).children().first();
    expect(el).to.have.$attr("class", "teamButtons hideTeamButtons");
  });



});
