
function safe_push(array, element){
    if(!array.find(e => e.id === element.id)){
        array.push(element)
    }
}

async function sif_parser(ev){
    // Parse
    let file = ev.target.files[0];
    let txt = await file.text();
    var interactions = SIFJS.parse(txt);
    console.log(interactions)

    // Supprime les associations au pathologies
    for(let i = 0; i < interactions.links.length; i++){
        if(interactions.links[i].source.includes("path(")){
            interactions.links.splice(i,1);
            i--;
        }
        if (interactions.links[i].target.includes("path(")){
            interactions.links.splice(i,1);
            i--;
        }
    }
    
    // Garde uniquement les associations avec les filter_nodes
    let filter_nodes = ['bp(MOA:"Envelope phospholipase F13 (p37) inhibitor")'];
    interactions.nodes = [];
    for(let i = 0; i < filter_nodes.length; i++){
        safe_push(interactions.nodes, {id : filter_nodes[i]});
    }

    // Supprime associations n'impliquant pas les filter_nodes, et conserve les nodes en association aux filter_nodes
    for(let i = 0; i < interactions.links.length; i++){
        if(filter_nodes.includes(interactions.links[i].source)){
            safe_push(interactions.nodes, {id : interactions.links[i].target})
            continue;
        }
        if(filter_nodes.includes(interactions.links[i].target)){
            safe_push(interactions.nodes, {id : interactions.links[i].source})
            continue;
        }


        interactions.links.splice(i,1);
        i--;
    }
    
    console.log(interactions)
    return interactions;
}
