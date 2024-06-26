const { google } = require('googleapis');
const path = require('path');
require('dotenv').config();

const serviceAccountPath = path.join(__dirname, 'credential.json'); 

// Googleシート認証のための部分
const auth = new google.auth.GoogleAuth({
  keyFile: serviceAccountPath,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

// Googleシートの資料をインポートするための機能部分
async function fetchData() {
  try {
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = `${process.env.GOOGLE_SHEET_NAME}!B4:DQ`;

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

async function fetchDataCompanyManagement() {
  try {
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = `工事管理DB用!G4:CY4`;

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
  fetchData: fetchData,
  fetchDataCompanyManagement: fetchDataCompanyManagement
};
