const cron = require('node-cron');

const task = () => {
    console.log('cron running...', new Date());
};

cron.schedule("* * * * *", task);