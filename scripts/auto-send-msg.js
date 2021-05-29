module.exports = {

    friendlyName: 'auto send message',

    description: '自动发送message',

    fn: async function () {
        var CronJob = require('cron').CronJob;

        var job = new CronJob(
            '* * * * * *',
            function () {
                console.log('You will see this message every second');

                var clients = require('../config/ClientConfig').find;
                var msgSql = {};
                var whereCondition = {};
                whereCondition.state = '1';
                msgSql.where = whereCondition;
                var query = MessageInfo.find(msgSql);
                var messages = [];
                query.exec(function (err, msgs) {
                    if (err) {
                        return;
                    } module.exports = {

                        friendlyName: 'auto send message',


                        description: '自动发送message',


                        fn: async function () {
                            var CronJob = require('cron').CronJob;

                            var job = new CronJob(
                                '* * * * * *',
                                function () {
                                    console.log('You will see this message every second');

                                    var clients = require('../config/ClientConfig').find;
                                    var msgSql = {};
                                    var whereCondition = {};
                                    whereCondition.state = '1';
                                    msgSql.where = whereCondition;
                                    var query = MessageInfo.find(msgSql);
                                    var messages = [];
                                    query.exec(function (err, msgs) {
                                        if (err) {
                                            return;
                                        }
                                        messages = msgs;
                                    });
                                    var message = messages[0];
                                    if (messages.length > 1) {
                                        for (var i = 0; i < messages.length; i++) {
                                            var msg = messages[i];
                                            if (msg.send < message.send) {
                                                message = msg;
                                            }
                                        }
                                    }
                                    console.log("need send message is :" + message);
                                    for (var j = 0; j < clients.length; j++) {
                                        var client = clients[i];
                                        client.send_time--;
                                        if (client.send_time <= 0) {
                                            var num = require('../config/phoneConfig').book;
                                            let number = num + '@c.us';
                                            await client.client.sendText(number, message.content)
                                                .then((result) => {
                                                    var book = await AddressBook.create({
                                                        phoneNumber: num,
                                                        messageID: message.id,
                                                    }).fetch();
                                                    console.log(book);
                                                })
                                                .catch((error) => {
                                                    console.error('Error when sending'); //return object error
                                                });
                                            let sleepData = Math.round(Math.random() * (50 - 15) + 30);
                                            console.log("sleep time count :", sleepData);
                                            client.send_time = sleepData;
                                            require('../config/ClientConfig').update(j, client);
                                        }
                                    }


                                },
                                null,
                                true,
                                'America/Los_Angeles'
                            );
                        }

                    };
                    messages[i];
                    if (msg.send < message.send) {
                        message = msg;
                    }
                }
                }
                console.log("need send message is :" + message);
        for (var j = 0; j < clients.length; j++) {
            var client = clients[i];
            client.send_time--;
            if (client.send_time <= 0) {
                var num = require('../config/phoneConfig').book;
                let number = num + '@c.us';
                await client.client.sendText(number, message.content)
                    .then((result) => {
                        var book = await AddressBook.create({
                            phoneNumber: num,
                            messageID: message.id,
                        }).fetch();
                        console.log(book);
                    })
                    .catch((error) => {
                        console.error('Error when sending'); //return object error
                    });
                let sleepData = Math.round(Math.random() * (50 - 15) + 30);
                console.log("sleep time count :", sleepData);
                client.send_time = sleepData;
                require('../config/ClientConfig').update(j, client);
            }
        }


    },
    null,
    true,
    'America/Los_Angeles'
        );
}

};
