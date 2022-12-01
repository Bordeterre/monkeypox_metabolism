
function go_to_pathwaySelection(graph, pathways){
    window.localStorage.clear();
    window.sessionStorage.setItem("graph",JSON.stringify(graph));

    window.location.href = "html/pathwaySelection.html";
}

function go_to_loadinggraph(graph){
    window.localStorage.clear();
    window.sessionStorage.setItem("graph",JSON.stringify(graph));

    window.location.href = "html/loadingGraph.html";
}

