/////////////////////////////////////////////////     FUNCTIONS     ////////////////////////////////////////////////

function initialize(){
    create_file_browser();
}

async function on_file_upload(ev){
    create_loader();
    let file = ev.target.files[0];
    let pathways = await build_graph_from_sif(GRAPH, file);
    go_to_pathwaySelection(GRAPH, pathways);
}


///////////////////////////////////////////////////     MAIN     ///////////////////////////////////////////////////
const GRAPH = new Graph();
initialize();
