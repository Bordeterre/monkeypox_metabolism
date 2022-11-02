

async function sif_parser(ev){
    let file = ev.target.files[0];
    let txt = await file.text();

    //console.log(txt);

    var interactions = SIFJS.parse(txt);
    console.log(interactions)
    return txt;
}
