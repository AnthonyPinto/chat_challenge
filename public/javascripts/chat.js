(function(){
  if (typeof Challenge === 'undefined') {
    window.Challenge = { };
  }
  
  Challenge.Chat = function(socket) {
    this.socket = socket
  }

  Challenge.Chat.prototype.sendMessage = function (message) {
    socket.emit('message', { body: 'message' });
  }

}());