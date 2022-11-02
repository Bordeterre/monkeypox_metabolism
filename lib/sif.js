//private members
var nodes = {}, links = {};
    
var _getNode = function(id){
    if(!nodes[id]) nodes[id] = {id:id};
    return nodes[id];
}
    
var _parse = function(line, i){
    line = (line.split('\t').length > 1) ? line.split('\t') : line.split(' ');
    
    if(line.length < 3){
        console.warn('SIFJS cannot parse line ' + i + ' "' + line + '"');
        return;
    }
    
    var source = _getNode(line[0]), intType = line[1], j, length;
    for (j = 2, length = line.length; j < length; j++) {
        var target = _getNode(line[j]);
            
        if(source < target){
            links[source.id + target.id + intType] = {target: target.id, source: source.id, intType: intType};
        }else{
            links[target.id + source.id + intType] = {target: target.id, source: source.id, intType: intType};
        }
    }        
}

var _toArr = function(obj){
    var arr = [];
    for (var key in obj) arr.push(obj[key]);
    return arr;
}    
    
//public
function SIFJS() {};
    
SIFJS.parse = function(text){
    
    var lines = text.split('\n'), i, length;
    for (i = 0, length = lines.length; i < length; i++) _parse(lines[i], i);
    
    return {nodes:_toArr(nodes), links:_toArr(links)};
};
