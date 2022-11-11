
function safe_push(array, element){
    if(!array.find(e => e.id === element.id)){
        array.push(element)
    }
}
async function sif_parser(file, filter_nodes){
    // Parse
    raw_text = await file.text();
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


/*
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

    let filter_nodes = ['bp(Reactome:"Defective AHCY causes HMAHCHD.")','bp(Reactome:"Sulfur amino acid metabolism.")','bp(GOBP:"one-carbon metabolic process")'];
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

    console.log(interactions)
    return interactions;
}
*/