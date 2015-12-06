var App = require("./app.jsx");
var Notifications = require("./notifications.js");
var qs = require("qs");
var React = require("react");
var ReactDOM = require("react-dom");
require('./index.css');

process.versions['electron'];

var appState = {};
var queryString = qs.parse(window.location.search.slice(1));
var teamUrl = queryString.teamUrl;
appState.teamUrl = teamUrl;
appState.notifications = new Notifications();

var domElement = document.querySelector("#app");
var reactElement = React.createElement(App, appState);
ReactDOM.render(reactElement, domElement);

//All of this code will be modularized properly and moved into React components
require('./window-opener.js');
require('./overlay.js');
