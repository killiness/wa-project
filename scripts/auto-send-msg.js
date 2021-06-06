const { find } = require('../config/ClientConfig');

module.exports = {

    friendlyName: 'auto send message',

    description: '自动发送message',

    fn: async function () {
        // var CronJob = require('cron').CronJob;

        // var job = new CronJob(
        //     '* * * * * *', () => {
        //         console.log('You will see this message every second');

        //         var clients = require('../config/ClientConfig').find();
        //         var msgSql = {};

        //         var messages = MessageInfo.find({
        //             state: "1"
        //         });
        //         if (messages.length <= 0) {
        //             return;
        //         }

        //         var message = messages[0];
        //         if (messages.length > 1) {
        //             for (var i = 0; i < messages.length; i++) {
        //                 var msg = messages[i];
        //                 if (msg.send < message.send) {
        //                     message = msg;
        //                 }
        //             }
        //         }

        //         console.log("need send message is :" + message);
        //         for (var j = 0; j < clients.length; j++) {
        //             var client = clients[i];
        //             client.send_time--;
        //             if (client.send_time <= 0) {
        //                 var num = require('../config/phoneConfig').book;
        //                 let number = num + '@c.us';
        //                 client.client.sendText(number, message.content)
        //                     .then((result) => {

        //                         var book = AddressBook.create({
        //                             phoneNumber: num,
        //                             userID: 100000,
        //                         }).fetch();
        //                         console.log(book);
        //                         var sendmsg = SendMessage.create({
        //                             content:message.content,
        //                             address:num,
        //                             client:client.session,
        //                             messageID:message.id
        //                         })
        //                         console.log(sendmsg)
        //                     })
        //                     .catch((error) => {
        //                         console.error('Error when sending'); //return object error
        //                     });
        //                 let sleepData = Math.round(Math.random() * (50 - 15) + 30);
        //                 console.log("sleep time count :", sleepData);
        //                 client.send_time = sleepData;
        //                 require('../config/ClientConfig').update(j, client);
        //             }
        //         }


        //     },
        //     null,
        //     true,
        //     'America/Los_Angeles'
        // );
        var oldDate = new Date();
        while (true) {
            if ((new Date()).getTime() - oldDate.getTime() < 1000) {
                continue;
            }
            oldDate = new Date();

            var clients = find();
            var messages = await MessageInfo.find({
                state: "1"
            });
            if (messages.length <= 0) {
                return;
            }

            var message = messages[0];
            if (messages.length > 1) {
                for (var i = 0; i < messages.length; i++) {
                    var msg = messages[i];
                    if (msg.send < message.send) {
                        message = msg;
                    }
                }
            }

            console.log("need send message is :" + message.content);
            console.log("send client length:" + clients.length)
            for (var j = 0; j < clients.length; j++) {
                var client = clients[i];
                client.send_time--;
                if (client.send_time <= 0) {
                    var num = require('../config/phoneConfig').book;
                    let number = num + '@c.us';
                    client.client.sendText(number, message.content)
                        .then((result) => {

                            var book = AddressBook.create({
                                phoneNumber: num,
                                userID: 100000,
                            }).fetch();
                            console.log(book);
                            var sendmsg = SendMessage.create({
                                content: message.content,
                                address: num,
                                client: client.session,
                                messageID: message.id
                            })
                            console.log(sendmsg)
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
        }
    }

};
