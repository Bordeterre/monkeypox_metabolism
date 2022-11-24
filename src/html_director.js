function create_file_browser(){
    let form = document.getElementById("file_upload");   
    form.addEventListener("change", on_file_upload);

}

function create_loader(){
    let loader = document.createElement("div");
    loader.setAttribute("class","lds-dual-ring");

    document.body.appendChild(loader)
}
function create_pathway_selector(pathways){
    /*
    document.location.href = "pathway_selection.html";
    
    let select_zone = document.getElementById("choice_pathway");
    let search_bar_zone = document.getElementById("search_bar");
    let submit_choice_zone = document.getElementById("submit_choice_pathway");
    
    create_pathway_searchbar(search_bar_zone);
    create_pathway_submit(submit_choice_zone);

    for (let bp of pathways) {
        create_pathway_checkbox(select_zone, bp);
    }
    */
    




}

function create_pathway_checkbox(zone, bp){
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
    zone.appendChild(newDiv);
}

function create_pathway_searchbar(zone){
    let search_bar = document.createElement("input");
    search_bar.type = "text";
    search_bar.id = "search_bar";
    search_bar.setAttribute("class","input");
    search_bar.placeholder = "Search for key words..";
    search_bar.addEventListener("input", search_function)
    zone.appendChild(search_bar);
}

function create_pathway_submit(zone){
    let button_submit = document.createElement("input");
    button_submit.type = "submit"
    button_submit.addEventListener("click", on_pathway_selection);
    zone.appendChild(button_submit)
}



function initialise_loading_bar(max){
    let progress_bar = document.createElement("progress");
    progress_bar.setAttribute("id","progress");
    progress_bar.value=0;
    progress_bar.max=max;

    let progress_zone = document.getElementById("progress_zone");
    progress_zone.textContent = '';
    progress_zone.appendChild(progress_bar);

    return progress_bar;
}

function update_loading_bar(progress_bar, value){
    progress_bar.value = value;
}

function display_fetch_in_progress(id){
    let fetch_msg = document.getElementById("fetch_msg");
    fetch_msg.textContent = "fetching "+id+"...";

}

function clear_loading_bar(){
    let progress_zone = document.getElementById("progress_zone");
    progress_zone.textContent = '';
    let fetch_msg = document.getElementById("fetch_msg");
    fetch_msg.textContent = '';

}