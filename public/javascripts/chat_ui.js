/*globals $, _ */

(function(){
  
  if (typeof Challenge === 'undefined') {
    window.Challenge = { };
  }
  
  Challenge.ChatUI = function(chat) {
    this.chat = chat
    
    // These are kludgy - waiting until I nail down design before fixing form parsing
    this.$messageInput = $("#message-body");
    this.$readout = $(".readout");
    this.$messageForm = $("#message-form");
    this.$nickname = $("#user-nickname");
    this.$nicknameInput = $("#nickname-body")
    this.$nicknameForm = $("#nickname-form");
    
    this.setHandlers();
  }
  _.extend(Challenge.ChatUI.prototype, {
    
    setHandlers: function () {
      var chatUI = this
      
      this.$messageForm.submit(function(event) {
        event.preventDefault();
        chatUI.sendMessage(chatUI.$messageInput.val());
      });
      
      this.$nicknameForm.submit(function(event) {
        event.preventDefault();
        chatUI.sendNickname(chatUI.$messageInput.val());
      });
      
      this.chat.socket.on('message', function (data) {
        chatUI.printMessage(data);
      });
      
      this.chat.socket.on('notice', function (data) {
        chatUI.printNotice(data);
      });
      
      this.chat.socket.on('nicknameResult', function (data) {
        if (data.success){
          chatUI.$nickname.text(data.body)
        }
      });
      
    },

    sendMessage: function(){
      var message = this.getMessage();
      this.chat.sendMessage(message);
    },
  
    getMessage: function(){
      return this.$messageInput.val();
    },
  
    printMessage: function(data){
      $h = $("<h5></h5>");
      $span1 = $("<span></span>");
      $span2 = $("<span></span>");
      $span1.text(data.nickname + ": ");
      $span2.text(data.body);
      $h.append($span1);
      $h.append($span2);
      this.$readout.append($h);
    },
    
    sendNickname: function(){
      var nickname = this.getNickname();
      this.chat.sendNickname(nickname);
    },
    
    getNickname: function(){
      return this.$nicknameInput.val();
    },
    
    printNotice: function(data){
      $h = $("<h5></h5>");
      $span = $("<span></span>");
      $span.text("*****" + data.body + "*****");
      $h.append($span);
      this.$readout.append($h);
    }

  })
  
}());