function pathway_selection_initialize(pathways){
    for (let bp of pathways) {
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
        zone = document.getElementbyClass("pathway-list");
        zone.appendChild(newDiv);
    }
}


let graph = window.sessionStorage.getItem("graph");
//let pathways = localStorage["pathways"];

console.log(graph);
//console.log(pathways);
//pathway_selection_initialize(pathways)
