function display_graph(json){
    let cy = cytoscape({
        container : document.getElementById("graph_display"),
        elements : json,
        style : cytoscapeSbgnStylesheet(cytoscape),
        
    });
    cy.layout({name: "cose"}).run();

///////////////////////////////////////////////////// To display entire name of assays when node is clicked //////////////////////////////////////////////////////////////

    cy.on('tap', 'node', function(evt){
        document.getElementById("name_display").innerHTML = "";
        var node_promised = evt.target;
        let node_name = get_name(node_promised.id(), json)
        let download_zone = document.getElementById("name_display");
        let entire_name_assay = document.createTextNode(node_name);
        download_zone.appendChild(entire_name_assay);
    });

}




let json = JSON.parse(window.sessionStorage.getItem("json"));
console.log(json);
display_graph(json);

