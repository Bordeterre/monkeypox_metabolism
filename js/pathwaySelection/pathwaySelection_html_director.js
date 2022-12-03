function create_pathway_selection_checkbox(pathways){
    let zone = document.getElementById("pathway-list");
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
        zone.appendChild(newDiv);
    }
}
function create_search_bar(){
    let search_bar = document.getElementById("search_bar");
    search_bar.addEventListener("input", search_function)
}
function create_submit(){
    let submit_choice = document.getElementById("submit_choice_pathway");
    submit_choice.addEventListener("click", on_pathway_selection);
}