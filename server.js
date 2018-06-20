var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var player_file = require('./server/player.js');

var graph_file = require('./server/graph.js');

var g = new graph_file.Graph();
var mn = new graph_file.Node();mn.data="mn";
var a1 = new graph_file.Node();a1.data="a1";
var a2 = new graph_file.Node();a2.data="a2";
var a2_1 = new graph_file.Node();a2_1.data="a2_1";
var a2_2 = new graph_file.Node();a2_2.data="a2_2";
a2_1.parent=a2;a2.children.push(a2_1);
a2_2.parent=a2;a2.children.push(a2_2);
a2.parent=mn;mn.children.push(a2);
a1.parent=mn;mn.children.push(a1);
g.masterNode=mn;
//g.printNodes();
g.updateNodes(node => console.log("data:" + node.data));

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

  socket.on('connection_successful',function(){
    socket.join('update_room');

  });

  socket.on('disconnect', function(data){
    for (var i = 0; i < player_list.length; i++){
      console.log()
      if (player_list[i].id == socket.id){player_list.splice(i,1);break;}
    }
    console.log('Disconnected:  sockets connected',player_list.length);
  });

});

function update_game(){
  var framesPerSecond=50;
  setInterval(function(){
    //1) update world
    //2) send rendering info
  },1000/framesPerSecond);
}
//update_game();
