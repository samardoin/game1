exports.Node=function(){
  this.data=null;
  this.parent=null;
  this.children=[];
}

exports.Graph=function(){
  this.masterNode = new exports.Node();
  this.updateNodes=function(action){
    var level = 1;
    var level_edges=[];
    var cn = this.masterNode;
    while(true){
      if (level_edges[String(level)]==undefined){
        level_edges[String(level)]=cn.children.length;
      }
      if (level_edges[String(level)] == 0){
        //console.log('data:' + cn.data);
        action(cn);
        if (level == 1){return;}
        delete level_edges[String(level)];
        level--;
        cn = cn.parent;
      }
      else{
        var index = level_edges[String(level)]-1;
        cn = cn.children[index];
        var t = cn.data;
        level_edges[String(level)]-=1;
        level++;
      }
    }
  }
}
