
function safe_push(array, element){
    if(!array.find(e => e.id === element.id)){
        array.push(element)
    }
}

async function sif_parser(file, filter_nodes){
    // Parse
    raw_text = await file.text();
    raw_text = raw_text.split("\r").join("");
    let interactions = SIFJS.parse(raw_text);
    

    // Remove pathologies
    for(let i = 0; i < interactions.links.length; i++){
        if(interactions.links[i].source.includes("path(") || interactions.links[i].target.includes("path(")){
            interactions.links.splice(i,1);
            i--;
        }
    }

    interactions.nodes = [];
    for(let i = 0; i < filter_nodes.length; i++){
        safe_push(interactions.nodes, {id : filter_nodes[i]});
    }

    //Ajouter à interactions.nodes les nodes en interaction avec bp
    for(let i = 0; i < interactions.links.length; i++){
        if(filter_nodes.includes(interactions.links[i].source)){
            safe_push(interactions.nodes, {id : interactions.links[i].target})
        }
        if(filter_nodes.includes(interactions.links[i].target)){
            safe_push(interactions.nodes, {id : interactions.links[i].source})

        }
    }

    // Remove edges n'utilisant pas les nodes choisis
    for(let i = 0; i < interactions.links.length; i++){
        if(interactions.nodes.find(e => e.id === interactions.links[i].source)){
            continue;
        }
        if(interactions.nodes.find(e => e.id === interactions.links[i].target)){
            continue;
        }
        interactions.links.splice(i,1);
        i--;
    }

    // Add node en interactions
    for(let i = 0; i < interactions.links.length; i++){
        if(interactions.nodes.find(e => e.id === interactions.links[i].source)){
            safe_push(interactions.nodes, {id : interactions.links[i].target});
        }
        if(interactions.nodes.find(e => e.id === interactions.links[i].target)){
            safe_push(interactions.nodes, {id : interactions.links[i].source});
        }
    }
    return interactions;


}   

async function fetch_CHembl(id){
    let result = await fetch("https://www.ebi.ac.uk/chembl/api/data/molecule/" + id + ".json")
        .then((response) => response.json());

    return result;
}