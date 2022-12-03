function search_function(ev){
    let input = ev.target.value
    let filter = input.toUpperCase();
    let path_checkboxes = document.getElementsByName("path");
    path_checkboxes.forEach(item => { // loop all the checkbox item
        if (item.id.toUpperCase().includes(filter)) {
            item.parentNode.style.display = "";
        }
        else {
            item.parentNode.style.display = "none";
            //unchek item that are no longer in the wanted items
            //item.checked = false;
        }
    })
}

async function on_pathway_selection(ev){
    //affiche le graphe avec juste les pathways dont on a besoin
    path_checkboxes = document.getElementsByName("path");
    let result = [];
    path_checkboxes.forEach(item => { // loop all the checkbox item
        if (item.checked) {  //if the check box is checked
            let data = item.value;   // create an object
            result.push(data); //stored the objects to result array
        }
    })
    //j'espère que je return le bon truc
    go_to_loadingGraph(graph, result)
}

function pathwaySelection_initialize(pathways){
    create_pathway_selection_checkbox(pathways);
    create_search_bar();
    create_submit();
}

let  object =  JSON.parse(window.sessionStorage.getItem("graph"));
let  graph = Object.assign(new Graph(), object);

let pathways = graph.get_pathways();

pathwaySelection_initialize(pathways)