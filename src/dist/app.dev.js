"use strict";

console.log("App.js is running!"); // JSX - JavaScript XML

var template = '<p> This is JSX from app.js! </p>';
var appBanner = document.getElementById("element_1");
var appRoot = document.getElementById("app");
ReactDOM.render(template, appRoot);
ReactDOM.render(banner, appBanner);