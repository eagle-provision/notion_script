const { Client } = require("@notionhq/client");
require("dotenv").config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const databaseId = "847f5259-6077-4203-a58d-a1d770ee7869";
  const response = await notion.databases.query({
    database_id: databaseId,
   
    sorts: [
      {
        property: "Last ordered",
        direction: "ascending",
      },
    ],
  });
  console.log(response);
})();