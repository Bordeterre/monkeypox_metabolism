
async function extract_json(graph, pathways){
    //pathways : liste des pathways à inclure ou exclure dans le json
    let data = [];
    let cardinality = 0;
    let n = 0;
    let path = await graph.extract_pathways(pathways);
    for (let i of path) {
        n+=1;

        let classe = i.class ;
        switch (classe){
            case "macromolecule" :
                await query_database(i);
                data.push({data:{id:i.id, class:i.class, label:i.label, name:i.name, clonemarker:"false", stateVariables: [], 
                unitsOfInformation: []}});
                break;
            case "simple chemical" :
                await query_database(i);
                data.push({data:{id:i.id, class:i.class, label:i.label, name:i.name, clonemarker:"false", stateVariables: [], 
                unitsOfInformation: []}});
                break;
            case "association" :
                if (i.source.class != "pathway" && i.target.class != "pathway"){
                    data.push({data:{id:i.id, class:"stimulation", cardinality:cardinality, source:i.source.id, target:i.target.id}});
                    cardinality +=10;
                }
                break;
        }
    }
    return data;
}

