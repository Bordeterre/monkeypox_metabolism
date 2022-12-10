function create_loader(){
    let loader = document.createElement("div");
    loader.setAttribute("class","lds-dual-ring");
    document.body.appendChild(loader)

    console.log("tttt")
}

function delete_loader(){
    let loader = document.getElementsByClassName("lds-dual-ring");
    loader[0].remove();
}