var graphs = require('./graph.js');

exports.Part=function(){
  this.name = "";
  this.id = null;
  this.slotsMax=0;
  this.ang = null;
  this.x = null;
  this.y = null;
  this.width = null;
  this.height = null;
}
exports.getNewNode=function(ndata){
  var n1 = new graphs.Node();
  n1.data = ndata;
  return n1;
}

//==========BODYS===========
var unique=0;
exports.square_part=function(){
  var p = new exports.Part();
  p.name="square_body";
  p.slotsMax=10;
  p.id=unique++;
  p.width=20;
  p.height=20;
  return  p;
}

//======CONNECTIONS=========
exports.connection_2=function(){
  var p = new exports.Part();
  p.name="connection_2";
  p.slotsMax=10;
  p.id=unique++;
  p.big=20;//60
  p.width=15;
  p.height=60;
  return  p;
}
