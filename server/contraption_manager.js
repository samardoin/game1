var contraption_file = require('./contraption.js');
//var cordinates = contraption_file.start();

var managers=[];

var Manager=function(){
  this.id=0;
  this.x=0;
  this.y=0;
  this.contraption = null;
  this.isUpdated= false;
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
    out.push({cord:cords, xo:managers[i].x, yo:managers[i].x});
    managers[i].isUpdated=false;
  }
  return out;
}
exports.get_contraptions_altered=function(){
  var out = [];
  for (let i = 0; i < managers.length;i++){
    if (managers[i].isUpdated==true){
      var cords = managers[i].contraption.get_cords();
      out.push({cord:cords, xo:managers[i].x, yo:managers[i].x});
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
