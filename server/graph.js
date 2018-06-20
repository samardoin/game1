exports.Node=function(){
  this.data=null;
  this.parent=null;
  this.children=[];
}

exports.printData=function(masterNode){
  /*exports.updateNodes(masterNode, node => {
    console.log('data:'+node.data);
  });*/
  exports.updateNodes(masterNode, function(node, level){
    console.log('╗');
    var s = "╟";
    for (var i = 0; i < level;i++)s+="───";
    console.log(s+node.data);
    console.log('╝');
  });
}

exports.printDataCenter=function(masterNode){
  console.log('╗');
  var prints = [];
  exports.updateNodes(masterNode, function(node, level){
    var s = "╟";
    for (var i = 0; i < level;i++)s+="───";
    s+=node.data;
    prints.push(s);
  });
  for (var i = prints.length-1; i>=0;i--){
    console.log(prints[i]);
  }
  console.log('╝');
}

exports.combine=function(p,c){
  p.children.push(c);
  c.parent=p;
}

exports.updateNodes=function(masterNode, action){
  var level = 0;
  var level_edges=[];
  var cn = masterNode;
  while(true){
    if (level_edges[String(level)]==undefined){
      level_edges[String(level)]=cn.children.length;
    }
    if (level_edges[String(level)] == 0){
      if (action.length==1)action(cn);
      else if (action.length==2)action(cn,level);
      else {console.log("Error @ update Nodes");}
      if (level == 0){return;}
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
