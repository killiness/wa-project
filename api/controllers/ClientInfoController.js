/**
 * ClientInfoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const fs = require('fs');
const venom = require('venom-bot');
const UUID = require('uuid');
const { Add, find, update } = require('../../config/ClientConfig');
const { book } = require('../../config/phoneConfig');


var exits = {
    success: {
        code: 20000,
        message: "success!",
    },
    faild: {
        code: 10001,
        message: "find data faill",
    }
}

module.exports = {

    friendlyName: "ClientController",

    clientInfo: async function (req, res) {
        // var cliSql = {}
        // var whereJson = {}
        // whereJson.clientState = '1';
        // cliSql.where = whereJson;
        // var clientResult = []
        // var clientResult = await ClientInfo.find(cliSql);
        var client = find();
        var result = exits.success;
        result.data = client.length;
        return res.json(result);

    },
    start: async function (req, res) {

        var CronJob = require('cron').CronJob;

        var job = new CronJob(
            '*/5 * * * * *', () => {
                console.log('You will see this message every second');
            
                var clients = find();
                var msgSql = {};
                var messages = [];
                var query = MessageInfo.find({
                    state: "1"
                });
                query.exec((err, result) => {
                    const { AddBook, findBook, AddSendMessage, findMessages } = require('../../config/sendmessageConfig');
                    messages = result;
                    console.log(err)
                    console.log('message is:' + messages.length);

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
                    console.log("need send clients is :" + clients.length);
                    console.log("client send time is :" + clients[0].send_time)
                    for (var j = 0; j < clients.length; j++) {
                        var client = clients[j];
                        console.log("client send time is :" + client.send_time)
                        if (client.send_time <= 5) {
                            client.send_time = 0
                        } else {
                            client.send_time -= 5;
                        }
                        if (client.send_time <= 0) {
                            var num = book()
                            let number = num + '@c.us';
                            console.log("send num is:" + num)
                            client.client.sendText(number, message.content)
                                .then((result) => {
                                    AddBook({
                                        phoneNumber: num,
                                        userID: 100000,
                                    });
                                  
                                    console.log("books length:" + findBook().length);
                                    AddSendMessage({
                                        content: message.content,
                                        address: num,
                                        client: client.session,
                                        messageID: message.id
                                    })
                                    console.log("sendmsg length :"+findMessages().length)
                                })
                                .catch((error) => {
                                   
                                    console.error('Error when sending'); //return object error
                                });
                            let sleepData = Math.round(Math.random() * (80 - 15) + 30);
                            console.log("sleep time count :", sleepData);
                            client.send_time = sleepData;
                            update(j, client);
                        }
                    }

                })

            },
            null,
            true,
            'America/Los_Angeles'
        );
        var result = exits.success;
        return res.json(result);
    },
    create: async function (req, res) {
        var sql = {};
        var whereCondition = {};
        whereCondition.phoneInfo = req.body.phone_message;
        whereCondition.clientState = '1';

        sql.where = whereCondition;
        var query = ClientInfo.find(sql);
        query.exec(function (err, clients) {
            console.log('find data error:' + err);
            if (!err & clients.length > 0) {
                return 'success';
            }
        });
        var sessionName = UUID.v1();
        venom.create(
            sessionName,
            (base64Qr, asciiQR, attempts, urlCode) => {
                console.log(asciiQR); // Optional to log the QR in the terminal
                console.log(attempts);
                console.log(urlCode);
                var result = exits.success
                result.data = urlCode;
                return res.json(result);
            },
            (statusSession, session) => {
                console.log('Status Session: ', statusSession);
                //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser
                //Create session wss return "serverClose" case server for close
                console.log('Session name: ', session);

            },
            {
                useChrome: false,
                headless: true,
                browserArgs: ['--disable-web-security', '--no-sandbox', '--disable-web-security',
                    '--aggressive-cache-discard', '--disable-cache', '--disable-application-cache',
                    '--disable-offline-load-stale-cache', '--disk-cache-size=0',
                    '--disable-background-networking', '--disable-default-apps', '--disable-extensions',
                    '--disable-sync', '--disable-translate', '--hide-scrollbars', '--metrics-recording-only',
                    '--mute-audio', '--no-first-run', '--safebrowsing-disable-auto-update',
                    '--ignore-certificate-errors', '--ignore-ssl-errors',
                    '--ignore-certificate-errors-spki-list', '--disable-setuid-sandbox'],
                logQR: false
            }
        )
            .then((client) => {
                clientJson = {};
                clientJson.session = sessionName;
                clientJson.client = client;
                clientJson.send_time = 0;
                Add(clientJson);
                ClientInfo.create({
                    session: sessionName,
                    userID: req.user.id,
                    clientState: 1,
                    phoneInfo: whereCondition.phoneInfo,
                });

                // function to detect incoming call
                client.onIncomingCall(async (call) => {
                    console.log(call);
                    client.sendText(call.peerJid, "Sorry, I still can't answer calls");
                });

                client.onStateChange((state) => {
                    console.log('State changed: ', state);
                    // force whatsapp take over
                    if ('CONFLICT'.includes(state)) client.useHere();
                    // detect disconnect on whatsapp
                    if ('UNPAIRED'.includes(state)) {
                        console.log('logout');

                    }
                    if ('TIMEOUT'.includes(state)) {
                        console.log('TIMEOUT');

                    }
                });


                let time = 0;
                client.onStreamChange((state) => {
                    console.log('State Connection Stream: ' + state);
                    clearTimeout(time);
                    if (state === 'DISCONNECTED' || state === 'SYNCING') {
                        time = setTimeout(() => {
                            client.close();
                        }, 80000);
                    }
                });
            })
            .catch((err) => {
                console.log(err)
            })
    },

    info: async function (req, res) {
        var session = req.body.session;
        var client = await ClientInfo.findOne({
            session: session,
        })
        var result = exits.success
        result.data = client;
        return res.json(result);

    }


};

