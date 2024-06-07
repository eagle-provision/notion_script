const { Client } = require('@notionhq/client');
require('dotenv').config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });



async function addOrderShipmentDB(databaseId, companyName, createdDate, code, productNo, answerPeriod, clientNoti, propertyName, groupName, manager, status, orderDate, productName, solarInstall, refLink) {
    try {
        const response = await notion.pages.create({
            parent: {
                type: 'database_id',
                database_id: databaseId,
            },
            properties: {
                '社名': {
                    type: 'title',
                    title: [
                        {
                            type: 'text',
                            text: {
                                content: companyName || 'Untitled', 
                            },
                        },
                    ],

                },
                '依頼日': {
                    type: 'date',
                    date: { start: createdDate || new Date().toISOString() },
                },
                'コード': {
                    type: 'rich_text',
                    rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: code || 'Untitled', // Provide a default value if code is undefined
                            },
                        },
                    ],
                },
                '案件番号': {
                    type: 'rich_text',
                    rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: productNo || 'Untitled', // Provide a default value if code is undefined
                            },
                        },
                    ],
                },
                '回答期日': {
                    type: 'date',
                    date: { start: answerPeriod || new Date().toISOString() },
                },
                '顧客提示日': {
                    type: 'date',
                    date: { start: clientNoti || new Date().toISOString() },
                },
                '物件名': {
                    type: 'rich_text',
                    rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: propertyName || 'Untitled', 
                            },
                        },
                    ],
                },
                'グループ': {
                    type: 'select',
                    select: {
                        name: groupName || 'Unknown', // Provide a default value if manager is undefined
                    },
                },
                '営業担当': {
                    type: 'select',
                    select: {
                        name: manager || 'Unknown', // Provide a default value if manager is undefined
                    },
                },
                'ステータス': {
                    type: 'select',
                    select: {
                        name: status || 'Unknown', 
                    },
                },

                '受注日': {
                    type: 'date',
                    date: { start: createdDate || new Date().toISOString(),
                        end:orderDate || new Date().toISOString()
                     },
                },
                '商品': {
                    type: 'rich_text',
                    rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: productName || 'Untitled', // Provide a default value if productName is undefined
                            },
                        },
                    ],
                },

                '太陽光施工': {
                    type: 'rich_text',
                    rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: solarInstall || 'Unknown', 
                            },
                        },
                    ],
                },
                '見積NO': {
                    type: 'url',
                    url: `https://sisolar.azurewebsites.net/QuoteBillingEntry?quoteNo=${refLink}` || '',
                },
            },
        });
    } catch (error) {
        console.error('Error creating page:', error.body);
    }
}


async function addMoneyManagementDB(companyName, createdDate, code, productName, manager, status, solarInstall, refLink) {
    try {
        const response = await notion.pages.create({
            parent: {
                type: 'database_id',
                database_id: process.env.ADD_MONEY_MANAGEMENT_DB,
            },
            properties: {
                '社名': {
                    type: 'title',
                    title: [
                        {
                            type: 'text',
                            text: {
                                content: companyName,
                            },
                        },
                    ],
                },
                '依頼日': {
                    type: 'date',
                    date: { start: createdDate },
                },
                'コード': {
                    type: 'rich_text',
                    rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: code,
                            },
                        },
                    ],
                },
                '物件名': {
                    type: 'rich_text',
                    rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: productName,
                            },
                        },
                    ],
                },
                '営業担当': {
                    type: 'select',
                    select: {
                        name: manager,
                    },
                },
                'ステータス': {
                    type: 'select',
                    select: {
                        name: status,
                    },
                },
                '太陽光施工': {
                    type: 'rich_text',
                    rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: solarInstall,
                            },
                        },
                    ],
                },
                '見積NO': {
                    type: 'url',
                    url: refLink,
                },
            },
        });
        console.log(response);
    } catch (error) {
        console.error(error.body);
    }
}



module.exports = {
    addOrderShipmentDB: addOrderShipmentDB,

  };
