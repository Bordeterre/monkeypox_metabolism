
function go_to_pathwaySelection(graph, pathways){
    window.localStorage.clear();
    window.sessionStorage.setItem("graph",JSON.stringify(graph));

    window.location.href = "html/pathwaySelection.html";
}

function go_to_loadingGraph(graph, pathways){
    //graph : la structure Graph
    //pathways : les pathways sélectionnés
    window.localStorage.clear();
    window.sessionStorage.setItem("graph",JSON.stringify(graph));
    window.sessionStorage.setItem("pathways",JSON.stringify(pathways));
    window.location.href = "../html/loadingGraph.html";
}

function go_to_displayGraph(json){
    window.localStorage.clear();
    window.sessionStorage.setItem("json",JSON.stringify(json));
    window.location.href = "../html/graph.html";
}

function get_name(id, json){
    for (let i of json){
        if (i.data.id == id){
            return i.data.name;
        }
    }
}
