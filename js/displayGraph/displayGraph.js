function display_graph(json){
    let cy = cytoscape({
        container : document.getElementById("graph_display"),
        elements : json,
        style : cytoscapeSbgnStylesheet(cytoscape),
        
    });
    cy.layout({name: "cose"}).run();

}



let json = JSON.parse(window.sessionStorage.getItem("json"));
console.log(json);
display_graph(json);

