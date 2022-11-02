/////////////////////////////////////////////////     FUNCTIONS     ////////////////////////////////////////////////
function initialize(){
    let form = document.createElement("input");
    form.setAttribute("type","file");
    form.setAttribute("class","browse");
    form.setAttribute("id","upload_input");
    form.addEventListener("change", sif_parser);

    let upload_zone = document.getElementById("upload_zone");
    upload_zone.appendChild(form);
}
///////////////////////////////////////////////////     MAIN     ///////////////////////////////////////////////////
initialize()
