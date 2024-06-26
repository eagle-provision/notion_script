const { Client } = require("@notionhq/client");
require("dotenv").config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });
// 現在存在するnotionからページを削除する（定期的に更新されるGoogleシートの資料を反映するための必須操作）
async function deleteAllPages(databaseID) {
  let hasMore = true;
  let startCursor = undefined;

  while (hasMore) {
    const { results, next_cursor, has_more } = await notion.databases.query({
      database_id: databaseID,
      start_cursor: startCursor,
    });

    for (const page of results) {
      await notion.pages.update({ page_id: page.id, archived: true });
    }

    hasMore = has_more;
    startCursor = next_cursor;
  }
}

// 関数のエクスポート
module.exports = {
  deleteAllPages: deleteAllPages,
};
