const colyseus = require('colyseus');

exports.ChatRoom = class extends colyseus.Room {
    // this room supports only 4 clients connected
    maxClients = 8;

    onCreate(options) {
        console.log("ChatRoom created!", options);

        this.onMessage("message", (client, message) => {
            console.log("ChatRoom received message from", client.sessionId, ":", message);
            this.broadcast("messages", message);
        });
    }

    onJoin(client) {
        this.broadcast("messages", `${client.sessionId} joined.`);
    }

    onLeave(client) {
        this.broadcast("messages", `${client.sessionId} left.`);
    }

    onDispose() {
        console.log("Dispose ChatRoom");
    }

}