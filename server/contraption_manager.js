var contraption_file = require('./contraption.js');
//var cordinates = contraption_file.start();

var managers=[];
var id_managerIndex=[];

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
  managers.push(m);
  id_managerIndex[id]=managers.length-1;
}

exports.get_contraptions=function(){
  var out = [];
  for (let i = 0; i < managers.length;i++){
    var cords = managers[i].contraption.get_cords();
    out.push({cord:cords, xo:managers[i].x, yo:managers[i].y});
    managers[i].isUpdated=false;
  }
  return out;
}
exports.get_contraptions=function(){
  var out = [];
  for (let i = 0; i < managers.length;i++){
    var cords = managers[i].contraption.get_cords();
    out.push({cord:cords, xo:managers[i].x, yo:managers[i].y});
    managers[i].isUpdated=false;
  }
  return out;
}
exports.get_contraptions_altered=function(){
  var out = [];
  for (let i = 0; i < managers.length;i++){
    if (managers[i].isUpdated==true){
      var cords = managers[i].contraption.get_cords();
      out.push({cord:cords, xo:managers[i].x, yo:managers[i].y});
      managers[i].isUpdated=false;
    }
  }
  return out;
}

exports.remove_contraption = function(id){
  for (let i = 0; i < managers.length;i++){
    if (managers[i].id == id){managers.splice(i,1);return;}
  }
}

exports.set_input=function(id, input){
  if (!(managers[id_managerIndex[id]].input===input)){
    var index = id_managerIndex[id];
    managers[index].isUpdated = true;
    managers[index].input = input;
  }
}

get_manager_id=function(id){
  return managers[id_managerIndex[id]];
}

var distance = 2;
exports.update=function(){
  for (let i = 0; i < managers.length;i++){
    if (managers[i].input.up){
      //console.log('up');
      managers[i].y+=distance;
    }
    else if (managers[i].input.down){
      managers[i].y-=distance
    }
    if (managers[i].input.left){

      managers[i].x-=distance;
    }
    else if (managers[i].input.right){
      managers[i].x+=distance;
    }

  }
}
