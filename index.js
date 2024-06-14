const { addOrderShipmentDB, addMoneyManagementDB } = require('./addDataToNotionDB.js');

const { fetchData } = require('./scrape.js');
const orderShipmentDB = process.env.ADD_ORDER_SHIPMENT_CONFIRM_DB;
const moneyManagementDB = process.env.ADD_MONEY_MANAGEMENT_DB;

async function main() {
    try {
        const data = await fetchData();
        for (const row of data) {
            await addOrderShipmentDB(orderShipmentDB,row[3], row[0], row[1], row[2], row[6], row[7], row[5], row[4], row[8], row[9], row[10], row[11], row[31], row[12]);
            await addMoneyManagementDB(moneyManagementDB, row[112], row[107], row[108], row[109], row[110], row[111], row[113], row[114], row[115], row[116], row[117], row[118], row[119])
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
