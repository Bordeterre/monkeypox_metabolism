/////////////////////////////////////////////////     FUNCTIONS     ////////////////////////////////////////////////

function index_initialize(){
    create_file_browser();
}

async function on_file_upload(ev){
    create_loader();
    let file = ev.target.files[0];
    let pathways;
    try {
        delete_error_message();
        pathways = await build_graph_from_sif(GRAPH, file);
        delete_loader();
    } catch {
        delete_loader();
        create_error_message();
        return;
    }

    go_to_pathwaySelection(GRAPH);
}


///////////////////////////////////////////////////     MAIN     ///////////////////////////////////////////////////
const GRAPH = new Graph();
index_initialize();
