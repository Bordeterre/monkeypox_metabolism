/////////////////////////////////////////////////     FUNCTIONS     ////////////////////////////////////////////////
function initialize(){
    let form = document.createElement("input");
    form.setAttribute("type","file");
    form.setAttribute("class","browse");
    form.setAttribute("id","upload_input");
    form.addEventListener("change", function(event){
        let result = sif_parser(event);
        console.log(result);
        let obj=result.then((value) => {
            console.log("hey");
            console.log(value);
            return value;
          });
        console.log('Bonjour');
        console.log(obj.then())
        // result is your return value
    });//sif_parser);

    let upload_zone = document.getElementById("upload_zone");
    upload_zone.appendChild(form);
}

async function chow_data(){
    //let data= await sif_parser();
    let test = await (Boolean(document.getElementById("upload_input").value));
    let input =document.getElementById("upload_input").value;
    console.log("ça marche");
    console.log(input);
}
///////////////////////////////////////////////////     MAIN     ///////////////////////////////////////////////////
initialize();
//chow_data();