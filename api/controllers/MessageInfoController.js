/**
 * MessageInfoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

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

    messageList: async function (req, res) {
        try {
            var page = req.query.page;
            var limit = req.query.limit;
            var sql = {}
            sql.where = {}
            sql.where.userID = req.user.id;
            sql.where.isDelete = 0;
            var count = (await MessageInfo.find(sql)).length;

            sql.limit = limit;
            sql.skip = (page - 1) * limit;
            sql.sort = 'createdAt DESC';
            var messages = await MessageInfo.find(sql);
            var messageList = []

            console.log(messages)
            for (var i = 0; i < messages.length; i++) {
                messages[i].createTime = formatterDateAll(new Date(messages[i].createdAt));
                messageList.push(messages[i]);
            }
            var result = exits.success;
            result.total = count;
            result.limit = limit;
            result.page = page;
            result.data = messageList;
            return res.json(result);
        } catch (err) {
            console.log(err)
            var result = exits.faild;
            return res.json(result);
        }

    },

    update: async function (req, res) {
        var messageId = req.body.messageId;
        var state = req.body.state;
        try {
            await MessageInfo.updateOne({
                id: messageId,
            }).set({
                state: state,
            })
            var result = exits.success;
            return res.json(result);
        } catch (err) {
            var result = exits.faild;
            return res.json(result);
        }
    },

    create: async function (req, res) {

        var values = req.body;
        var content = values.content;
        var totalSend = values.totalSend;
        var isRandomSend = values.isRandomSend;
        var userId = req.user.id;
        console.log("isRandom:" + isRandomSend)

        if (isRandomSend === 'true') {
            console.log("content :" + values);

            var msgInfo = await MessageInfo.create({
                content: content,
                totalSend: totalSend,
                isRandomSend: isRandomSend,
                userID: userId,
                state: 1
            }).fetch();

        } else {
            var msgInfo = await MessageInfo.create({
                content: content,
                totalSend: totalSend,
                isRandomSend: isRandomSend,
                userID: userId,
                state: 1
            }).fetch();

            var addStr = req.body.addressText;
            addStr = addStr.replace(" ", "");
            addStr = addStr.replace("+", "");
            addStr = addStr.replace("\n", "");
            addList = addStr.split(";");
            console.log(addList);
            var addJsons = []
            for (var i = 0; i < addList.length; i++) {
                var adj = {};
                adj.phoneNumber = addList[i];
                adj.messageID = msgInfo.id;
                adj.userID = req.user.id;
                addJsons.push(adj);
            }
            console.log(addJsons)
            await AddressBook.createEach(addJsons);

        }
        console.log(msgInfo);
        var success = exits.success;
        success.message = "New Message was created successfully";

        return res.json(success);
    },

    info: async function (req, res) {
        let messageId = req.body.messageId;
        var message = await MessageInfo.findOne({
            id: messageId,
        })
        var success = exits.success;
        success.data = message;
        return res.json(success);
    }
};
function formatterDateAll(date) {
    var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
        + (date.getMonth() + 1);
    var hor = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    return date.getFullYear() + '-' + month + '-' + day + " " + hor + ":" + min + ":" + sec;
}
