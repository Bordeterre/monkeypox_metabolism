function create_file_browser(){
    let form = document.getElementById("file_upload");
    form.addEventListener("change", on_file_upload);
}

function create_loader(){
    let loader = document.createElement("div");
    loader.setAttribute("class","lds-dual-ring");
    document.body.appendChild(loader)
}
