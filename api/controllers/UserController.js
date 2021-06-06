/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { session } = require("../../config/session");
var jwt = require("jsonwebtoken");

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
    friendlyName: "UserController",

    info: async function (req, res) {
        // console.log(req.headers);
        var userId = req.user.id;
        var user = await User.findOne({
            id: userId,
        })

        var result = exits.success;
        result.data = user;
        result.data.roles = []
        result.data.roles.push(user.roleKey);
        result.data.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif';
        return res.json(result);
    },

    register: async function (req, res) {

        var data = req.body;
        var date = formatterDateAll(new Date());
        var newUserRecord = await User.create({
            name: data.name,
            password: await sails.helpers.passwords.hashPassword(data.password),
            roleKey: data.roleKey,
            totalSend: data.totalSend,
            lastLoginTime: date
        }).fetch();
        console.log(newUserRecord);
        var result = exits.success
        return res.json(result);
    },

    login: async function (req, res) {
        let data = req.body;
        if (!(data.username) || !(data.password)) {
            var result = exits.faild;
            result.message = "账户和密码不能为空"
            console.log(result)
            return res.json(result);
        }
        let name = data.username;
        let password = data.password;

        var user = await User.findOne({
            name: name,
        })

        if (!user) {
            var result = exits.faild;
            result.code = 50000;
            result.message = "no register!"
            return res.json(result);
        }

        await sails.helpers.passwords.checkPassword(password, user.password).intercept(
            (err) => {
                return res.json(exits.faild);
            });

        var date = formatterDateAll(new Date())
        await User.updateOne({ name: name })
            .set({
                lastLoginIp: req.ip,
                lastLoginTime: date
            });

        user.token = jwt.sign(user.toJSON(), session.secret, {
            expiresIn: '7d'
        });
        var result = exits.success
        result.data = user;
        return res.json(result);
    },

    token: function (req, res) {
        User.findOne(req.user.id).exec(function callback(error, user) {
            if (error) return res.status(500).json({ "code": 50012, "message": "error", "data": null });
            if (!user) return res.status(500).json({ "code": 50014, "message": "User not found, please sign up.", "data": null });

            user.token = jwt.sign(user.toJSON(), session.secret, {
                expiresIn: '7d'
            });
            res.status(200).json({ "code": 20000, "message": "login successfully", "data": user });
        });
    },

    spreadInfo: async function (req, res) {

        var user = await User.findOne(req.user.id);
        var totalSend = user.totalSend;
        var balance = user.balance;
        var messages = await MessageInfo.find({
            userID: req.user.id,
        })
        var send = 0;
        for (var i = 0; i < messages.length; i++) {
            send += messages[i].send;
        }
        var info = {
            totalSend: totalSend,
            balance: balance,
            send: totalSend - send
        }
        var result = exits.success;
        result.data = info;
        return res.json(result);
    },

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