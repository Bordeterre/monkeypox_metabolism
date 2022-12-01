function go_to_pathwaySelection(graph, pathways){
    var favoritemovie = "Shrek";
    window.sessionStorage.setItem("graph",favoritemovie);
    //localStorage["pathways"] = pathways;
    let graph = window.sessionStorage.getItem("graph");
    console.log(graph);
    //window.location.assign("html/pathwaySelection.html");
    window.location.href = "html/pathwaySelection.html";



    console.log("PathwaySelection initialized !");
    console.log(graph);

}
