

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
    //let filter_nodes = ['bp(MOA:"Envelope phospholipase F13 (p37) inhibitor")','bp(Reactome:"Defective AHCY causes HMAHCHD.")','bp(Reactome:"Sulfur amino acid metabolism.")','bp(GOBP:"one-carbon metabolic process")'];
    let file = ev.target.files[0];
    // List of all pathways in the sif
    let pathways = await build_graph_from_sif(GRAPH, file);
    //file = write_json(GRAPH);
    //display_graph(filter_nodes);
    //console.log(GRAPH)                                                                                    à remettre
    //console.log(file)
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
        checkbox.style.display = "";

        // Creation label (so it is possible to click on the text too)
        let label_checkbox = document.createElement("label")
        label_checkbox.htmlFor = checkbox.id;
        label_checkbox.style.display = "";
        label_checkbox.appendChild(document.createTextNode(name));

        // Adding a div and append checkbox and label to the div
        const newDiv = document.createElement("div");
        newDiv.style.display = "";
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

    let search_bar = document.createElement("input");
    search_bar.type = "text";
    search_bar.id = "search_bar";
    search_bar.setAttribute("class","input");
    search_bar.placeholder = "Search for key words..";
    search_bar.addEventListener("input", search_function)
    let search_bar_zone = document.getElementById("search_bar");
    search_bar_zone.appendChild(search_bar);
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
        //console.log(item.id.toUpperCase())
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
    display_graph(result)
}


async function display_graph(pathways){
    //console.log(pathways)                                             à remettre

    let cy = cytoscape({
        container : document.getElementById("graph_display"),
        elements : await extract_json(GRAPH, pathways,true),
        style : cytoscapeSbgnStylesheet(cytoscape),
        
    });

    //console.log(cy);                                                  à remettre
    cy.layout({name: "fcose"}).run();


///////////////////////////////////////////////////// Pour cliquer sur un node //////////////////////////////////////////////////////////////


    cy.on('tap', 'node', function(evt){
        var node = evt.target;
        console.log( 'tapped ' + node.id() );

    


        //// créer un texte sur la page pour écrire le nom de l'assay en entier
        let bidule = document.createElement("div");
        let entire_name_assay = document.createTextNode('Hi there and greetings!');
    // ajoute le nœud texte au nouveau div créé
    newDiv.appendChild(newContent);
    });

    let name_text = document.createElement("entire_name_of_assays");
    form.setAttribute("type","file");
    form.setAttribute("class","browse");
    form.setAttribute("id","upload_input");
    form.addEventListener("change", on_file_upload);

    let upload_zone = document.getElementById("download_zone");
    let entire_name_assay = document.createTextNode('Hi there and greetings!');
    download_zone.appendChild(entire_name_assay);


   
/*


cy.on('tap', 'node', function(evt){
    var node = evt.target;
    let name = get_node_name(node);
    console.log( 'name : ');
    console.log(name);
  });

*/

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////






///////////////////////////////////////////////////     MAIN     ///////////////////////////////////////////////////
const GRAPH = new Graph();
initialize();
