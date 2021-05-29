/**
 * ClientInfoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const fs = require('fs');
const venom = require('venom-bot');
const UUID = require('uuid');

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
        var cliSql = {}
        var whereJson = {}
        whereJson.clientState = '1';
        cliSql.where = whereJson;
        var clientResult = []
        var query = ClientInfo.find(cliSql);
        query.exec(function (err, clients) {
            if (err) {
                var result = exits.faild;
                result.message = err;
                return res.json(result);
            } else {
                for (var i = 0; i < clients.length; i++) {
                    clientResult.push(clients[i]);
                }
                var result = exits.success
                result.data = clientResult;
                return res.json(result);
            }

        });

    },

    create: async function (req, res) {
        var sql = {};
        var whereCondition = {};
        whereCondition.phoneInfo = req.get('phone_message');
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
                require('../../../config/ClientConfig').Add(clientJson);
                ClientInfo.create({
                    session: sessionName,
                    userID: req.user.id,
                    clientState: 1,
                    phoneInfo: whereCondition.phoneInfo,
                }).fetch();
                // function to detect incoming call
                client.onIncomingCall(async (call) => {
                    console.log(call);
                    client.sendText(call.peerJid, "Sorry, I still can't answer calls");
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

