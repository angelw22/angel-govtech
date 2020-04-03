const { google } = require('googleapis');
const sheets = google.sheets('v4');
const privatekey = require("../../../privatekey.json")

const apiRoutes = app => {
  app.post('/upload', (req, res, next) => {
    console.log( 'received webhook', req.body);
    const spreadsheetId = '1tR2DjNMWSZcZVo-R2AtyBANay5Giq25KiltNVSrXc9w';
    const range = 'Sheet1!B:J'
    let jwtClient = new google.auth.JWT(
      privatekey.client_email, 
      null, 
      privatekey.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    )

    jwtClient.authorize(function(err, tokens) {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log('successfully connected jwt!')
      }
    })

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
        console.log('api returned an error', err)
      } else {
        console.log(response)
      }
    })
    res.sendStatus( 200 );
  })
}

export default apiRoutes;