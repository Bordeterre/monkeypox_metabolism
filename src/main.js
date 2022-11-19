

/////////////////////////////////////////////////     FUNCTIONS     ////////////////////////////////////////////////

function initialize(){
    let form = document.createElement("input");
    form.setAttribute("type","file");
    form.setAttribute("class","browse");
    form.setAttribute("id","upload_input");
    form.addEventListener("change", on_file_upload);

    let upload_zone = document.getElementById("upload_zone");
    upload_zone.appendChild(form);
}

async function on_file_upload(ev){
    // Codé en dur pour l'instant, à remplacer par un choix interactif de l'utilisateur et/ou une config file
    let filter_nodes = ['bp(MOA:"Envelope phospholipase F13 (p37) inhibitor")','bp(Reactome:"Defective AHCY causes HMAHCHD.")','bp(Reactome:"Sulfur amino acid metabolism.")','bp(GOBP:"one-carbon metabolic process")'];
    let file = ev.target.files[0];

    // List of all pathways in the sif
    let pathways = await build_graph_from_sif(GRAPH, file);
    //display_graph(filter_nodes);
    console.log(filter_nodes)
    console.log(pathways)
    // Créer boutons et eventlisteners pour sélectionner des paths à filtrer
    let select_zone = document.getElementById("choice_pathway");

    for (let bp of pathways) {
        //C'est super spécifique à notre fichier, faudra un moyen de pas coder en dur ou de laisser les noms moches
        let name = bp.substring(
            bp.indexOf('(') + 1,
            bp.lastIndexOf(')')
        );

        // Creation checkbox
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = name;
        checkbox.name = "path";
        checkbox.value = bp;

        // Creation label (so it is possible to click on the text too)
        let label_checkbox = document.createElement("label")
        label_checkbox.htmlFor = name
        label_checkbox.appendChild(document.createTextNode(name));

        // Adding a div and append checkbox and label to the div
        const newDiv = document.createElement("div");
        newDiv.appendChild(checkbox);
        newDiv.appendChild(label_checkbox);

        // Add div to choice_pathway div
        select_zone.appendChild(newDiv);
    }
    let button_submit = document.createElement("input");
    button_submit.type = "submit"
    button_submit.addEventListener("click", on_pathway_selection);
    let submit_choice_zone = document.getElementById("submit_choice_pathway")
    submit_choice_zone.appendChild(button_submit)
}

async function on_pathway_selection(ev){
    //affiche le graphe avec juste les pathways dont on a besoin
    path_checkboxes = document.getElementsByName("path");

    let result = [];
    path_checkboxes.forEach(item => { // loop all the checkbox item
        if (item.checked) {  //if the check box is checked
            let data = item.value   // create an object
            result.push(data); //stored the objects to result array
        }
    })
    display_graph(result)
}

async function display_graph(pathways){
    console.log(pathways)
    let cy = cytoscape({
        container : document.getElementById("graph_display"),
        elements : await extract_json(GRAPH, pathways,true),
        style : cytoscapeSbgnStylesheet(cytoscape),
        
    });

    console.log(cy);
    cy.layout({name: "circle"}).run();

}

///////////////////////////////////////////////////     MAIN     ///////////////////////////////////////////////////
const GRAPH = new Graph();
initialize();