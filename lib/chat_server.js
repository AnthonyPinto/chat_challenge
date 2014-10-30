var socketio = require('socket.io')

var guestNumber = 1;
var nicknames = {};
var usedNames = [];

function createChatServer(server) {
  var io = socketio.listen(server);
  io.on('connection', function (socket) {
    var nick = "Guest" + guestNumber;
    nicknames[socket.id] = nick;
    usedNames.push(nick);
    guestNumber += 1;
    processMessages(socket, io);
    processNicknames(socket, io);
    socket.emit('nicknameResult', {
      success: true,
      body: nick
    });
    io.emit('notice', {
      body: nick + " has joined the chat."
    });
  })
}

var processMessages = function(socket, io) {
  
  socket.on('message', function (data) {
    io.emit('message', {
      nickname: nicknames[socket.id],
      body: data.body
    });
  });

}

var processNicknames = function(socket, io) {
  
  socket.on('nicknameRequest', function (data) {
    console.log("*****************" + data.nickname + "*********************")
    for (var i = 0; i < usedNames.length; ++i){
      console.log(usedNames[i])
    }

    var nick = data.nickname;
    var guestCheckSlice = nick.slice(0, 4);
    
    if (guestCheckSlice === "Guest" || guestCheckSlice === "guest"){
      socket.emit('nicknameResult', {
        success: false,
        body: "Nickname cannot begin with Guest!"
      });
    } else if (usedNames.indexOf(nick) > -1){
      socket.emit('nicknameResult', {
        success: false,
        body: "The nickname '" + nick + "' has already been taken!"
      });
    } else {
      var oldNick = nicknames[socket.id];
      usedNames.splice(usedNames.indexOf(oldNick), 1);
      usedNames.push(nick);
      nicknames[socket.id] = nick;
      socket.emit('nicknameResult', {
        success: true,
        body: nick
      });
      io.emit('notice', {
        body: oldNick + " has changed their nickname to " + nick
      });
    }

  });

}

module.exports = createChatServer;