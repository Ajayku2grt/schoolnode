const cron = require('node-cron');
const fs = require('fs');
const path = require('path');


const invoices =  require('./data/invoice.json');
const archiveinvoiceTask = () => {
    try {
        const paidInvoice = invoices.filter((item) => {
           return item.status === "paid";
        });
        if(paidInvoice.length > 0){
            paidInvoice.forEach((item) => {
                invoices.splice(invoices.findIndex((e) => {
                        e.status === item.status
                    }), 
                    1
            )
            
          });
          fs.writeFileSync(
            path.join(__dirname, "./", "data", 'invoice.json'),
            JSON.stringify(invoices),
            "utf-8"
          )
          fs.writeFileSync(
            path.join(__dirname, "./", "data", 'archive.json'),
            JSON.stringify(paidInvoice),
            "utf-8"
          )
        }

    } catch (error) {
        console.log(error);
    }
    console.log('complete');
};
cron.schedule("*/30 * * * * *", archiveinvoiceTask);
