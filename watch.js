const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const NetSocket = require('net');
const net = new NetSocket.Socket();

// Web socket
wss.on('connection', function connection(ws) {
    console.log((new Date()) + ' Remote connection accepted ' + ws.remoteAddress);
    net.write("{\"server\":\"ipad\"};");
    ws.on('message', function incoming(message) {
  //      console.log('Received from remote: %s', message);
        net.write(message)
    });
    
    ws.on('close', function(){
        console.log((new Date()) + ' Remote connection closed');
    });
});


// Net socket
net.connect(8745, '127.0.0.1', function() {
    console.log((new Date()) + ' Local connection stablished');
});

net.on('data', function(data) {
    // Iterate the connected devices to send the broadcast
    wss.clients.forEach(function each(c) {
        if (c.readyState === WebSocket.OPEN) {
    //        console.log('Received from local: ' + data);
            c.send(data);
        }
    });
});

net.on('close', function() {
	console.log('Local connection closed');
});
