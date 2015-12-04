var App = require("./app.jsx");
var React = require("react");
var ReactDOM = require("react-dom");
require('./index.css');

process.versions['electron'];

var domElement = document.querySelector("#app");
var reactElement = React.createElement(App);
ReactDOM.render(reactElement, domElement);

//All of this code will be modularized properly and moved into React components
require('./load-src.js');
require('./window-opener.js');
require('./overlay.js');
