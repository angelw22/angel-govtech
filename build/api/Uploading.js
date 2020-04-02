"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require('googleapis'),
    google = _require.google;

var sheets = google.sheets('v4');

var privatekey = require("../../../privatekey.json");

var apiRoutes = function apiRoutes(app) {
  app.post('/upload', function (req, res, next) {
    console.log('received webhook', req.body);
    var spreadsheetId = '1tR2DjNMWSZcZVo-R2AtyBANay5Giq25KiltNVSrXc9w';
    var range = 'Sheet1!A2:E1';
    var jwtClient = new google.auth.JWT(privatekey.client_email, null, privatekey.private_key, ['https://www.googleapis.com/auth/spreadsheets']);
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log('successfully connected jwt!');
      }
    });
    sheets.spreadsheets.values.append({
      auth: jwtClient,
      spreadsheetId: spreadsheetId,
      range: range,
      resource: {
        values: [req.body]
      },
      valueInputOption: 'USER_ENTERED'
    }, function (err, response) {
      if (err) {
        console.log('api returned an error', err);
      } else {
        console.log(response);
      }
    });
    res.sendStatus(200);
  });
};

var _default = apiRoutes;
exports["default"] = _default;