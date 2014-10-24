(function(){
  if (typeof Challenge === 'undefined') {
    window.Challenge = { };
  }
  
  Challenge.Chat = function(socket) {
    this.socket = socket
  }
  
  _.extend(Challenge.Chat.prototype, {
    sendMessage: function (message) {
      this.socket.emit('message', { body: message });
    }
  })

}());