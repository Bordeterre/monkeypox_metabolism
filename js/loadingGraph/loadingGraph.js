
async function loadingGraph_initialize(pathways){

    
    let json = await extract_json(GRAPH, pathways);
    go_to_displayGraph(json);
}


let  object =  JSON.parse(window.sessionStorage.getItem("graph"));
const GRAPH = Object.assign(new Graph(), object);

const PATHWAYS =  JSON.parse(window.sessionStorage.getItem("pathways"));

loadingGraph_initialize(PATHWAYS)
