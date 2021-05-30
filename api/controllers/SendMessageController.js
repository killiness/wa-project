/**
 * SendMessageController
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

    sendList: async function (req, res) {
        var user = await User.findOne(req.user.id);
        let page = req.body.page;
        let limit = req.body.limit;
        var sql = {}
        sql.where = {}
        sql.where.isDelete = 0;
        if (user.roleKey == 'editor') {
            var messages = await MessageInfo.find({
                userID: req.user.id,
                isDelete: 0,
            });
            var messageId = []
            for (var msg in messages) {
                messageId.push(msg.id);
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

};

