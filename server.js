var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var player_file = require('./server/player.js');

var player_list=[];


server.listen(process.env.PORT || 8080);
console.log("server running");

app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
  app.use(express.static('client'));
});

io.sockets.on('connection', function(socket){
  var p = new player_file.Player();
  p.id = socket.id;
  player_list.push(p);
  console.log('Connected:  players connected:', player_list.length);

  socket.on('disconnect', function(data){
    for (var i = 0; i < player_list.length; i++){
      console.log()
      if (player_list[i].id == socket.id){player_list.splice(i,1);break;}
    }
    console.log('Disconnected:  sockets connected',player_list.length);
  });

});
