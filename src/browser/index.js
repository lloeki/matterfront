var App = require("./app.jsx");
var React = require("react");
var ReactDOM = require("react-dom");
var teamObserver = require("./team-observer.js");
require('./index.css');

var domElement = document.querySelector("#app");
var reactElement = React.createElement(App);
ReactDOM.render(reactElement, domElement);

teamObserver.start();
