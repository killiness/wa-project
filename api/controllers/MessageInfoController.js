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
        try{
            var messages =await MessageInfo.find({
                state:"1",
                userID:req.user.id,
                isDelete:0,
            });
            var messageList = []
            console.log(messages)
            for (var i = 0; i < messages.length; i++) {
                messageList.push(messages[i]);
            }
            var result = exits.success;
            result.data = messageList;
            return res.json(result);
        }catch(err){
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
                id: messageId
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

        console.log("content :" + values);

        var msgInfo = await MessageInfo.create({
            content: content,
            totalSend: totalSend,
            isRandomSend: isRandomSend,
            userID: userId,
            state: 1
        }).fetch();
        console.log(msgInfo);
        var success = exits.success;
        success.message = "New Message was created successfully";

        return res.json(success);
    }
};

