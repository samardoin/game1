var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var player_file = require('./server/player.js');
var contraption_manager_file = require('./server/contraption_manager.js')
var player_number = 0;

server.listen(process.env.PORT || 8080);
console.log("server running");

app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
  app.use(express.static('client'));
});

io.sockets.on('connection', function(socket){
  console.log('Connected:  players connected:', ++player_number);

  socket.on('connection_successful',function(){
    contraption_manager_file.new_contraption(Math.floor(Math.random() * 500),
      Math.floor(Math.random() * 500),
      socket.id);
    socket.join('update_room');
    io.to('update_room').emit('player_edit',contraption_manager_file.get_contraptions());
  });

  socket.on('disconnect', function(data){
    contraption_manager_file.remove_contraption(socket.id);
    io.to('update_room').emit('player_edit',contraption_manager_file.get_contraptions());
    console.log('Disconnected:  sockets connected',--player_number);
  });
});

function update_game(){
  var framesPerSecond=50;
  setInterval(function(){
    check_if_contraption_changed();
    //1) update world
    //2) send rendering info
  },1000/framesPerSecond);
}
//update_game();
