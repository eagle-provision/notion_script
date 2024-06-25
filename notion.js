const { Client } = require("@notionhq/client");
const { google } = require("googleapis");
const path = require("path");
require("dotenv").config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function getPageContent() {
  let hasMore = true;
  let startCursor = undefined;
  const pageData = [];

  while (hasMore) {
    const { results, next_cursor, has_more } = await notion.databases.query({
      database_id: "847f5259-6077-4203-a58d-a1d770ee7869",
      start_cursor: startCursor,
    });

    for (const page of results) {
      const pageContent = await notion.pages.retrieve({ page_id: page.id });

      const companyName =
        pageContent.properties["社名"]?.title[0]?.text?.content;
      const createdDate = pageContent.properties["依頼日"]?.date?.start;
      const code =
        pageContent.properties["コード"]?.rich_text[0]?.text?.content;
      const productNo =
        pageContent.properties["案件番号"]?.rich_text[0]?.text?.content;
      const answerPeriod = pageContent.properties["回答期日"]?.date?.start;
      const clientNoti = pageContent.properties["顧客提示日"]?.date?.start;
      const propertyName =
        pageContent.properties["物件名"]?.rich_text[0]?.text?.content;
      const groupName = pageContent.properties["グループ"]?.select?.name;
      const manager = pageContent.properties["営業担当"]?.select?.name;
      const status = pageContent.properties["ステータス"]?.select?.name;
      const orderDate = pageContent.properties["受注日"]?.date?.end;
      const productName =
        pageContent.properties["商品"]?.rich_text[0]?.text?.content;
      const solarInstall =
        pageContent.properties["太陽光施工"]?.rich_text[0]?.text?.content;
      const refLink = pageContent.properties["見積NO"]?.url;

      pageData.push({
        companyName,
        createdDate,
        code,
        productNo,
        answerPeriod,
        clientNoti,
        propertyName,
        groupName,
        manager,
        status,
        orderDate,
        productName,
        solarInstall,
        refLink,
      });
    }

    hasMore = has_more;
    startCursor = next_cursor;
  }
  await updateGoogleSheet(pageData);
}
const serviceAccountPath = path.join(__dirname, "credential.json");

const auth = new google.auth.GoogleAuth({
  keyFile: serviceAccountPath,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

async function updateGoogleSheet(data) {
  try {
  const authClient = await auth.getClient();

  const sheets = google.sheets({ version: "v4", auth: authClient });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${process.env.GOOGLE_SHEET_NAME}!B4:DQ`,
  });
  const existingData = response.data.values;

  const updatedData = [];
  for (const item of data.reverse()) {
    const existingRow = existingData.find(
      (row) => row[3] === item.companyName && row[0] === item.createdDate
    );
    if (existingRow) {
      existingRow[3] = item.companyName;
      existingRow[0] = item.createdDate;
      existingRow[1] = item.code;
      existingRow[2] = item.productNo;
      existingRow[6] = item.answerPeriod;
      existingRow[7] = item.clientNoti;
      existingRow[5] = item.propertyName;
      existingRow[4] = item.groupName;
      existingRow[8] = item.manager;
      existingRow[9] = item.status;
      existingRow[10] = item.orderDate;
      existingRow[11] = item.productName;
      existingRow[31] = item.solarInstall;
      existingRow[12] = item.refLink;
      updatedData.push(existingRow);
    } else {
      updatedData.push([
        item.companyName,
        item.createdDate,
        item.code,
        item.productNo,
        item.answerPeriod,
        item.clientNoti,
        item.propertyName,
        item.groupName,
        item.manager,
        item.status,
        item.orderDate,
        item.productName,
        item.solarInstall,
        item.refLink,
      ]);
    }
  }


  const request = {
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${process.env.GOOGLE_SHEET_NAME}!B4:DQ`,
    valueInputOption: 'USER_ENTERED',
      resource: { values: updatedData },
    auth: auth
  };

  let result = await sheets.spreadsheets.values.update(request);
  console.log(result.data.updatedRange);
  } catch (err) {
    console.error('Error updating data:', err);
  }
}

getPageContent();
