async function display_cytoscape_graph(pathways){
    console.log(pathways)

    let cy = cytoscape({
        container : document.getElementById("graph_display"),
        elements : await extract_json(GRAPH, pathways,true),
        style : cytoscapeSbgnStylesheet(cytoscape),
        
    });

    console.log(cy);
    cy.layout({name: "fcose"}).run();
}