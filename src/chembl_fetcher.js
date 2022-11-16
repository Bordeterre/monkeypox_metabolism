
async function fetch_catalyst_from_Chembl(protein) {
    let id_CHembl = protein.id.split(":")[1].slice(0, -1);

    let json = await fetch("https://www.ebi.ac.uk/chembl/api/data/target/search.json?(target_type=SINGLE%20PROTEIN%20OR%20target_type=NUCLEIC-ACID%20)&(species:%27Homo%20sapiens%27)%20OR%20(species:%27Monkeypox%20virus%27)&q=" + id_CHembl)
        .then((response) => response.json());
    console.log(json)
    console.log(id_CHembl)
    if(json.targets[0] != undefined){
        protein.label = json.targets[0].pref_name;
        if (json.targets[0].cross_references != undefined && json.targets[0].cross_references.length > 0) {
            protein.uniprot_id = json.targets[0].cross_references[0].xref_id;
        } else {
            protein.uniprot_id = null;
        }
    }
}

async function fetch_metabolite_from_Chembl(metabolite) {
    let id_CHembl = metabolite.id.split(":")[1].slice(0, -1);
    let json = await fetch("https://www.ebi.ac.uk/chembl/api/data/chembl_id_lookup/search.json?&q=" + id_CHembl)
        .then((response) => response.json());
    
    //console.log(json.chembl_id_lookups[0].entity_type)

    if (json.chembl_id_lookups[0].entity_type != "ASSAY") {
        let json_metabolite = await fetch("https://www.ebi.ac.uk/chembl/api/data/molecule/search.json?&q=" + id_CHembl)
            .then((response) => response.json());
        //console.log(json_metabolite.molecules[0] )
        //console.log(json_metabolite.molecules[0].pref_name)
        metabolite.label = json_metabolite.molecules[0].pref_name;
    }

    else {
        metabolite.label = "ASSAY_" + id_CHembl; //à adapter
    }
}
