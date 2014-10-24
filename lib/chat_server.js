var socketio = require('socket.io')

function createChatServer(server) {
  var io = socketio.listen(server);
  io.on('connection', function (socket) {
    processMessages(socket, io);
  })
}

var processMessages = function(socket, io) {
  
  socket.on('message', function (data) {
    console.log("boop")
    
    io.emit('message', {
          body: data.body,
    });
  });

}

module.exports = createChatServer;