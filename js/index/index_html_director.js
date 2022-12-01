function create_file_browser(){
    let form = document.getElementById("file_upload");
    form.addEventListener("change", on_file_upload);
}

function create_loader(){
    let loader = document.createElement("div");
    loader.setAttribute("class","lds-dual-ring");
    document.body.appendChild(loader)
}

function delete_loader(){
    let loader = document.getElementsByClassName("lds-dual-ring");
    loader[0].remove();
}

function create_error_message(){
    let message = document.createElement("div");
    message.setAttribute("class","error-message");
    message.textContent = "Mauvais format !"
    document.body.appendChild(message)
}

function delete_error_message(){
    let message = document.getElementsByClassName("error-message");
    if(message[0]){
        message[0].remove();
    }
}