var send = {
    session: "",
    state: "",
    send_time: "",
    client: Object,
}
var sendMessages = [];

var Books = [];

exports.AddSendMessage = function (msg) {
    sendMessages.push(msg);
}

exports.updateMessages = function (count, msg) {
    sendMessages[count] = msg;
}

exports.findMessages = function () {
    return sendMessages;
}

exports.SendMessageNull = function () {
    sendMessages = []
}

var msgsql = {
    content: "test data",
    address: "111111111",
    client: "client.session",
    messageID: 1
}

exports.testMsgOne = function () {
    sendMessages.push(msgsql);
}


exports.AddBook = function (msg) {
    Books.push(msg);
}

exports.findBook = function () {
    return Books;
}

exports.BookToNull = function () {
    Books = [];
}
var sql = {
    phoneNumber: "11111",
    userID: 100000,
}
exports.testBookOne = function () {
    Books.push(sql);
}