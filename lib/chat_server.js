function createChatServer(server) {
  var io = require('socket.io')(server);

  io.on('connection', function (socket) {
    socket.emit('message', { body: 'this is text' });
    socket.on('message', function (data) {
      console.log(data);
    });
  });
}

module.exports = createChatServer;