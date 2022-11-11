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
    ///// TESTE LE FETCH /////
    //let result = await fetch_CHembl("CHEMBL1201130");
    //console.log(result);

    ///// TESTE LE PARSEUR /////
    // Codé en dur pour l'instant, à remplacer par un choix interactif de l'utilisateur et/ou une config file
    let filter_nodes = ['bp(Reactome:"Defective AHCY causes HMAHCHD.")','bp(Reactome:"Sulfur amino acid metabolism.")','bp(GOBP:"one-carbon metabolic process")'];
    //filter_nodes = ['bp(Reactome:"Defective AHCY causes HMAHCHD.")']

    let file = ev.target.files[0];
    await GRAPH.from_sif(file, filter_nodes)
    console.log(GRAPH);
    //let interactions = await sif_parser(file, filter_nodes);
    //console.log(interactions);
}

///////////////////////////////////////////////////     MAIN     ///////////////////////////////////////////////////
const GRAPH = new Graph();
initialize()

