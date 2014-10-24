/*globals $, _ */

(function(){
  
  if (typeof Challenge === 'undefined') {
    window.Challenge = { };
  }
  
  Challenge.ChatUI = function(chat) {
    this.chat = chat
    this.$input = $("#message-body");
    this.$readout = $(".readout");
    this.$form = $("form");
    this.$form.submit(function(event) {
      event.preventDefault();
      this.send(this.$input.val());
    }.bind(this))
  }
  _.extend(Challenge.ChatUI.prototype, {
  
    getMessage: function(){
      return this.$input.val();
    },
  
    send: function(){
      var message = this.getMessage();
      this.chat.sendMessage(message);
      this.printOut(message);
    },
  
    printOut: function(message){
      $h = $("<h5></h5>");
      $span1 = $("<span></span>");
      $span2 = $("<span></span>");
      $span1.text("name: ");
      $span2.text(message);
      $h.append($span1);
      $h.append($span2);
      Challenge.ChatUI.$readout.append($h);
    }

  })
  
}());