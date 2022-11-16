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
    let data = [];
    cardinality = 0;
    for (let i of GRAPH.elements) {
        let classe = i.class ;
        switch (classe){
            case "macromolecule" :
              data.push({data:{id:i.id, class:i.class, label:i.label, clonemarker:"false", stateVariables: [], 
              unitsOfInformation: []}});
              break;
            case "simple chemical" :
              data.push({data:{id:i.id, class:i.class, label:i.label, clonemarker:"false", stateVariables: [], 
              unitsOfInformation: []}});
              break;
            case "association" :
              if (i.source.class != "pathway" && i.target.class != "pathway"){
                  data.push({data:{id:i.id, class:i.class, cardinality:cardinality, source:i.source.id, target:i.target.id}});
                  cardinality +=10;
              }
              break;
        }
    }
    return (data);
}