const { addOrderShipmentDB, addMoneyManagementDB, addCompanyManagementDB } = require('./addDataToNotionDB.js');
const { deleteAllPages } = require("./deleteAllPage.js");

const { fetchData, fetchDataCompanyManagement } = require('./scrape.js');
const orderShipmentDB = process.env.ADD_ORDER_SHIPMENT_CONFIRM_DB;
const moneyManagementDB = process.env.ADD_MONEY_MANAGEMENT_DB;
const companyManagementDB = process.env.ADD_COMPANY_MANAGEMENT_DB;

//Googleシートの資料でnotion DBを更新するメイン関数
async function main() {
    try {
        
        // Googleシートから資料を読み込む
        const data = await fetchData();
        const companyData = await fetchDataCompanyManagement();
        
        // ページ削除ファンクションの呼び出し
        if (data) {
            await deleteAllPages(orderShipmentDB);
            await deleteAllPages(moneyManagementDB);
        }
        if (companyData) {
            await deleteAllPages(companyManagementDB);
        }
        // インポートしたデータをnotion DBに読み込む
        for (const row of data) {
            await addOrderShipmentDB(orderShipmentDB,row[3], row[0], row[1], row[2], row[6], row[7], row[5], row[4], row[8], row[9], row[10], row[11], row[31], row[12]);
            await addMoneyManagementDB(moneyManagementDB, row[112], row[107], row[108], row[109], row[110], row[111], row[113], row[114], row[115], row[116], row[117], row[118], row[119]);
        }
        for (const row of companyData) {
            await addCompanyManagementDB(companyManagementDB, row[0], row[3], row[6], row[10], row[48], row[50], row[52], row[53], row[54], row[56], row[57], row[58], row[59], row[69], row[80], row[81], row[82], row[85], row[96]);
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

// メインファンクションコール
main();
