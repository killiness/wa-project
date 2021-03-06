/**
 * AddressBookController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { findBook, BookToNull, testBookOne } = require("../../config/sendmessageConfig");

let exits = {
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

    create: async function (req, res) {
        let data = req.body;
        var phoneNumber = data.phoneNumber;
        var messageID = 0;
        if (data.messageID) {
            messageID = data.messageID;
        }
        try {
            await AddressBook.create({
                phoneNumber: phoneNumber,
                messageID: messageID,
                userID: req.user.id,
            }).fetch();
            var result = exits.success;
            result.message = 'success';
            return res.json(result);
        } catch (err) {
            var result = exits.faild;
            result.message = err;
            return res.json(result);
        }
    },

    toList:async function (req,res) {
        var addresss = findBook()
        await AddressBook.createEach(addresss);
        BookToNull()
        var result = exits.success;
        return res.json(result)
    },

    createMore: async function (req, res) {
        let data = req.body;
        var phoneNumbers = data.numbers;
        var messageID = data.messageID;
        var messageID = 0;
        if (data.messageID) {
            messageID = data.messageID;
        }
        try {

            var saveData = []
            for (var number in phoneNumbers) {
                var savesql = {}
                savesql.phoneNumber = number;
                savesql.messageID = messageID;
                savesql.userID = req.user.id;
                saveData.push(savesql);
            }


            await AddressBook.createEach(saveData).fetch();
            var result = exits.success;
            result.message = "save data:" + saveData.length;
            return res.json(result);
        } catch (err) {
            var result = exits.faild;
            result.message = err;
            return res.json(result);
        }
    },


    addressList: async function (req, res) {
        var page = req.body.page;
        var limit = req.body.limit;
        var user = await User.findOne(req.user.id);
        if (!user) {
            var result = exits.faild;
            result.message = error;
            return res.json(result)
        } else {
            var sql = {};
            sql.where = {};
            sql.limit = limit;
            sql.skip = (page - 1) * limit;
            sql.sort = 'createdAt DESC';

            sql.where.isDelete = 0;

            var result = exits.success
            if (user.roleKey == 'admin') {

                var total = (await AddressBook.find({ isDelete: 0, })).length;
                var addressList = await AddressBook.find(sql)
                result.data = addressList;
                result.total = total;
                result.page = page;
                result.limit = limit;
                return res.json(result);
            } else {
                var total = (await AddressBook.find({ isDelete: 0, userID: req.user.id })).length;
                sql.where.userID = req.user.id;
                var addressList = await AddressBook.find(sql)
                result.page = page;
                result.total = total;
                result.limit = limit;
                result.data = addressList;
                return res.json(result);
            }
        }
    },

    info: async function (req, res) {
        let addressId = req.body.addressId;
        var address = await AddressBook.findOne({
            id: addressId,
        })
        var success = exits.success;
        success.data = address;
        return res.json(success);
    }

};

