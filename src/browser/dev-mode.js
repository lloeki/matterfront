var electronConnect = require("electron-connect");

var client = electronConnect.client.create();
window.addEventListener("beforeunload", function(){
  client.sendMessage("exit");
});
console.info("Matterfront DevMode activated.");
