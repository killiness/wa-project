/**
 * SendMessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { testBookOne, testMsgOne, findMessages, SendMessageNull } = require("../../config/sendmessageConfig");

var exits = {
    success: {
        code: 20000,
        message: "success!",
    },
    faild: {
        code: 10001,
        message: "login faill",
    }
}


module.exports = {

    info: async function (req, res) {
        let sendId = req.body.sendId;
        var sendMessage = await SendMessage.findOne({
            id: sendId,
        })
        var success = exits.success;
        success.data = sendMessage;
        return res.json(success);
    },

    listAll:async function (req, res) {
       var sendMessages =await SendMessage.find({
           isDelete:0,
       })
       var result = exits.success;
       result.data = sendMessages;
       return res.json(result);
    },

    toList: async function (req, res) {
        // testMsgOne()
        var sendMessages = findMessages();
        console.log("send msg length:"+sendMessages.length)
        await SendMessage.createEach(sendMessages);
        SendMessageNull();
        return res.json(exits.success)
    },

    sendListbyUser: async function (req, res) {
        var user = await User.findOne(req.user.id);
        let page = req.body.page;
        let limit = req.body.limit;
        var sql = {}
        sql.where = {}
        sql.where.isDelete = 0;
        if (user.roleKey == 'editor') {
            var messages = await MessageInfo.find({
                userID: req.user.id,
            });
            var messageId = []
            for (var i = 0; i < messages.length; i++) {
                messageId.push(messages[i].id)
            }
            sql.where.messageID = messageId;
        }

        var count = await SendMessage.find(sql).count;
        sql.limit = limit;
        sql.skip = (page - 1) * limit;
        sql.sort = 'createdAt DESC';
        var sendList = await SendMessage.find(sql);

        var result = exits.success;

        result.total = count;
        result.limit = limit;
        result.page = page;
        result.data = sendList;
        return res.json(result)
    },

    sendListbyMsg: async function (req, res) {
        var user = await User.findOne(req.user.id);
        let page = req.body.page;
        let limit = req.body.limit;
        let messageId = req.body.messageId;
        var sql = {}
        sql.where = {}
        sql.where.isDelete = 0;

        sql.where.messageID = messageId;
        var count = (await SendMessage.find(sql)).length;
        sql.limit = limit;
        sql.skip = (page - 1) * limit;
        sql.sort = 'createdAt DESC';
        var sendList = await SendMessage.find(sql);

        var result = exits.success;
        result.total = count;
        result.limit = limit;
        result.page = page;
        result.data = sendList;
        return res.json(result)
    },

};

