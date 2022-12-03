
function loadingGraph_initialize(pathways){
    console.log(pathways)
}


let  object =  JSON.parse(window.sessionStorage.getItem("graph"));
const GRAPH = Object.assign(new Graph(), object);

const PATHWAYS =  JSON.parse(window.sessionStorage.getItem("pathways"));

loadingGraph_initialize(PATHWAYS)