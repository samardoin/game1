var contraption_file = require('./contraption.js');
//var cordinates = contraption_file.start();

var managers=[];
var id_managerIndex=[];

var id_managers=[]//*****!!!!!!!!!

var inputter=function(){
  up=false;
  down=false;
  left=false;
  right=false;
}

var Manager=function(){
  this.id=0;
  this.x=0;
  this.y=0;
  this.contraption = null;
  this.isUpdated= false;
  this.input = new inputter();
}

exports.new_contraption=function(x,y,id){
  var m = new Manager();
  m.contraption = new contraption_file.Contraption();
  m.contraption.setUp();
  m.x=x;
  m.y=y;
  m.id=id;
  m.isUpdated=true;
  id_managers[id]=m;
}

exports.get_contraptions=function(){
  var out = [];
  for (let key in id_managers){
    var cords = id_managers[key].contraption.get_cords();
    out.push({cord:cords, xo:id_managers[key].x, yo:id_managers[key].y,id:id_managers[key].id});
    id_managers[key].isUpdated=false;
  }
  return out;
}
exports.get_contraptions_altered=function(){
  var out = [];
  for (let key in id_managers){
    if (id_managers[key].isUpdated){
      var cords = id_managers[key].contraption.get_cords();
      out.push({cord:cords, xo:id_managers[key].x, yo:id_managers[key].y});
      id_managers[key].isUpdated=false;
    }
  }
  return out;
}

exports.remove_contraption = function(id){
  delete id_managers[id];
}

exports.set_input=function(id, input){
  if (!(id_managers[id].input===input)){
    id_managers[id].isUpdated=true;
    id_managers[id].input=input;
  }
}


var distance = 2;
exports.update=function(){
  for (let key in id_managers){
    if (id_managers[key].input.up) id_managers[key].y+= distance;
    else if (id_managers[key].input.down) id_managers[key].y-=distance;

    if (id_managers[key].input.left){id_managers[key].x-=distance;}
    else if (id_managers[key].input.right) id_managers[key].x+=distance;
  }
}
