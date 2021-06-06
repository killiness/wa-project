var client = {
    session: "",
    state: "",
    send_time: "",
    client: Object,
}
clients = []

exports.Add = function (client) {
    clients.push(client);
}

exports.update = function (count, client) {
    clients[count] = client;
}

exports.find = function () {
    return clients;
}