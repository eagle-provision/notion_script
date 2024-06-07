const { addOrderShipmentDB } = require('./addDataToNotionDB.js');
const { fetchData } = require('./scrape.js');
const orderShipmentDB = process.env.ADD_ORDER_SHIPMENT_CONFIRM_DB;
const userName = process.env.USERNAME;

async function main() {
    try {
        const data = await fetchData();
        for (const row of data) {
            await addOrderShipmentDB(orderShipmentDB,row[3], row[0], row[1], row[2], row[6], row[7], row[5], row[4], row[8], row[9], row[10], row[11], row[31], row[12]);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
