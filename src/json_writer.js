function load_json(data){

    let json_file = JSON.stringify(data);
    let string = "data:text/json;charset=utf-8," + encodeURIComponent(json_file);
    let element = document.createElement("a");
    element.setAttribute('download',"Data.json");
    element.setAttribute('href',string);
    document.body.appendChild(element);
    element.click();
    element.remove();
}

function write_json(GRAPH){
    let data = {elements:[]};
    for (let i of GRAPH.elements) {
        let classe = i.class ;
        switch (classe){
            case "macromolecule" :
                data.elements.push({data:{id:i.id}});
                break;
            case "simple chemical" :
                data.elements.push({data:{id:i.id}});
                break;
            case "association" :
                if (i.source.class != "pathway" && i.target.class != "pathway"){
                    data.elements.push({data:{id:i.id, source:i.source.id, target:i.target.id}});
                }
                break;
        }
    }
    return (data);
}

/*
elements: [ // list of graph elements to start with
    { // node a
      data: { id: 'a' }
    },
    { // node b
      data: { id: 'b' }
    },
    { // edge ab
      data: { id: 'ab', source: 'a', target: 'b' }
    }
  ]
*/

/*
function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
  */