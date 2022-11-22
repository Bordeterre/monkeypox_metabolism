

/////////////////////////////////////////////////     FUNCTIONS     ////////////////////////////////////////////////

function initialize(){
    create_file_browser();
}

async function on_file_upload(ev){
    let file = ev.target.files[0];
    let pathways = await build_graph_from_sif(GRAPH, file);
    create_pathway_selector(pathways)
}

async function recap(){
    /*let text_choice = document.createElement("button");
            //text_choice.class = "link";
            //text_choice.style.background = "none";
            //text_choice.style.border = "none";
            text_choice.appendChild(document.createTextNode(data));
            console.log(text_choice)

            recap_zone = document.getElementById("recap_choice");
            console.log()
            recap_zone.appendChild(text_choice);*/
}

function search_function(ev){
    let input = ev.target.value
    let filter = input.toUpperCase();
    let path_checkboxes = document.getElementsByName("path");
    path_checkboxes.forEach(item => { // loop all the checkbox item
        console.log(item.id.toUpperCase())
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
    await display_cytoscape_graph(result)
    clear_loading_bar()
}




///////////////////////////////////////////////////     MAIN     ///////////////////////////////////////////////////
const GRAPH = new Graph();
initialize();