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


async function addMoneyManagementDB(databaseId, invoiceNo, orderAmount, orderAmountTax, requestDate, issueDate, invoiceIssueDate, transferDeadline, fax, depositAmount, SIFee, payDiff, depositDate, confirmDate) {
    try {
        const response = await notion.pages.create({
            parent: {
                type: 'database_id',
                database_id: databaseId,
            },
            properties: {
                '請求書No': {
                    type: 'title',
                    title: [
                        {
                            type: 'text',
                            text: {
                                content: invoiceNo,
                            },
                        },
                    ],
                },
                '受注金額': {
                    type: 'rich_text',
                    rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: orderAmount || 'Untitled', // Provide a default value if code is undefined
                            },
                        },
                    ],
                },
                '税込金額': {
                    type: 'rich_text',
                    rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: orderAmountTax,
                            },
                        },
                    ],
                },
                '振込依頼日': {
                    type: 'date',
                    date: { start: requestDate },
                },
                '発行日付': {
                    type: 'date',
                    date: { start: issueDate },
                },
                '請求書発行日': {
                    type: 'date',
                    date: { start: invoiceIssueDate },
                },
                '振込締切日': {
                    type: 'date',
                    date: { start: transferDeadline },
                },
                'FAX': {
                    type: 'rich_text',
                    rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: fax,
                            },
                        },
                    ],
                },
                '入金額': {
                    type: 'rich_text',
                    rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: depositAmount,
                            },
                        },
                    ],
                },
                'SI負担/手数料': {
                    type: 'rich_text',
                    rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: SIFee,
                            },
                        },
                    ],
                },
                '入金差異': {
                    type: 'rich_text',
                    rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: payDiff,
                            },
                        },
                    ],
                },
                '入金日': {
                    type: 'date',
                    date: { start: depositDate },
                },
                '確認日': {
                    type: 'date',
                    date: { start: confirmDate },
                },         
            },
        });
    } catch (error) {
        console.error(error.body);
    }
}



module.exports = {
    addOrderShipmentDB: addOrderShipmentDB,
    addMoneyManagementDB: addMoneyManagementDB,
  };
