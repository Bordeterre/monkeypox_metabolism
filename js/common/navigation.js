/*
function go_to_pathwaySelection(graph, pathways){
    var favoritemovie = "Shrek";
    window.sessionStorage.setItem("graph",favoritemovie);
    //localStorage["pathways"] = pathways;
    let g2 = window.sessionStorage.getItem("graph");
    console.log(g2);
    //window.location.assign("html/pathwaySelection.html");
    window.location.href = "html/pathwaySelection.html";



    console.log("PathwaySelection initialized !");
    console.log(graph);

}
*/

function go_to_pathwaySelection(graph, pathways){
    window.sessionStorage.setItem("graph",JSON.stringify(graph));
    window.sessionStorage.setItem("pathways",JSON.stringify(pathways));

    window.location.href = "html/pathwaySelection.html";
}
