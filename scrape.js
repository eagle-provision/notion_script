const { google } = require('googleapis');
const path = require('path');
require('dotenv').config();

const serviceAccountPath = path.join(__dirname, 'credential.json'); 

const auth = new google.auth.GoogleAuth({
  keyFile: serviceAccountPath,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

async function fetchData() {
  try {
    const authClient = await auth.getClient();

    const sheets = google.sheets({ version: 'v4', auth: authClient });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = '20240529共有用!B4:DQ';

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    return rows;

  } catch (err) {
    console.error('Error fetching data:', err);
  }
}
module.exports = {
  fetchData: fetchData
};
