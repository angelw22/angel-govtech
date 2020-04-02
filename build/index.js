"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _Uploading = _interopRequireDefault(require("./api/Uploading"));

var cors = require('cors');

var express = require('express');

var app = express();
var port = 5000;
// app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', function (req, res) {
  return res.send('hello there');
});
app.use(cors());
app.options('*', cors());
app.use(express.json());
(0, _Uploading["default"])(app);
app.listen(port, function () {
  return console.log("Example app listening on port ".concat(port, "!"));
});