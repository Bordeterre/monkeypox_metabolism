

async function sif_parser(ev){
    let file = ev.target.files[0];
    let txt = await file.text();
    txt = txt.split('\r').join('');

    var interactions = SIFJS.parse(txt);
    console.log(interactions)

    /*
    Pour arcourir nodes et voir ce qu'on veut
    for(var i = 0; i < interactions.nodes.length; i++){
        var nodeType = interactions.nodes[i].id.split("(")[0];
        if(["bp"].includes(nodeType) ){
            console.log(interactions.nodes[i].id);
        }
        
    }
    */
    
    return txt;
}
