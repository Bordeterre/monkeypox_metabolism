

/////////////////////////////////////////////////     FUNCTIONS     ////////////////////////////////////////////////

function initialize(){
    let form = document.createElement("input");
    form.setAttribute("type","file");
    form.setAttribute("class","browse");
    form.setAttribute("id","upload_input");
    form.addEventListener("change", on_file_upload);

    let upload_zone = document.getElementById("upload_zone");
    upload_zone.appendChild(form);
}

async function on_file_upload(ev){
    // Codé en dur pour l'instant, à remplacer par un choix interactif de l'utilisateur et/ou une config file
    let filter_nodes = ['bp(Reactome:"Defective AHCY causes HMAHCHD.")','bp(Reactome:"Sulfur amino acid metabolism.")','bp(GOBP:"one-carbon metabolic process")'];
    let file = ev.target.files[0];
    await build_graph_from_sif(GRAPH, file);
    display_graph(filter_nodes);

    // Créer boutons et eventlisteners pour sélectionner des paths à filtrer
}

async function on_pathway_selection(ev){
    //affiche le graphe avec juste les pathways dont on a besoin
}
async function display_graph(pathways){
    
    let cy = cytoscape({
        container : document.getElementById("graph_display"),
        elements : await extract_json(GRAPH, pathways,true),
        style : cytoscapeSbgnStylesheet(cytoscape),
        
    });

    console.log(cy);
    cy.layout({name: "circle"}).run();

}

///////////////////////////////////////////////////     MAIN     ///////////////////////////////////////////////////
const GRAPH = new Graph();
initialize();