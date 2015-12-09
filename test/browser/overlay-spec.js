var Overlay = require("../../src/browser/overlay.jsx");

describe("Overlay", function(){
  it ("hides when connectionState is `online`", function(){
    var el = $(razz.render(Overlay, {
      connectionState: "online"
    })).children().first();
    expect(el).to.have.$css("opacity", "0");
    expect(el).to.have.$css("z-index", "-1");
  });

  it ("shows when connectionState is not `online`", function(){
    var el = $(razz.render(Overlay, {
      connnectionState: "offline"
    })).children().first();
    expect(el).to.have.$css("opacity", "0.5");
    expect(el).to.have.$css("z-index", "100");
  });
});
