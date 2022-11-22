
async function fetch_catalyst_from_Chembl(protein) {
    let id_CHembl = protein.id.split(":")[1].slice(0, -1);

    let json = await fetch("https://www.ebi.ac.uk/chembl/api/data/target/search.json?(target_type=SINGLE%20PROTEIN%20OR%20target_type=NUCLEIC-ACID%20)&(species:%27Homo%20sapiens%27)%20OR%20(species:%27Monkeypox%20virus%27)&q=" + id_CHembl+"%20")
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



async function query_database(node){
    if(node.was_fetched){
        return;
    }
    let database = node.id.split(":")[0];
    let id = node.id.split(":")[1].slice(0, -1);

    switch (database){
        case "p(HGNC" : await fetch_protein_HGNC(node,id) ; break;
        case "a(ChEMBL" : await fetch_molecule_ChEMBL(node,id) ; break;
        case "a(ChEMBLAssay" : await fetch_assay_ChEMBL(node,id) ; break;
        default : console.log("Fetch error, unrecognized database !!! "); console.log(database);
    }

    node.was_fetched = true;
}


async function fetch_protein_HGNC(node,id){
    let json = await fetch("https://rest.genenames.org/fetch/symbol/" + id, {headers :{'Accept': 'application/json'}})
        .then((response) => response.json());
    console.log(json.response.numFound)
    if (json.response.numFound != 0){
        node.label = json.response.docs[0].name
        node.uniprot_id = json.response.docs[0].uniprot_ids
    }
    else {
        // temporary notation to understand why it is not found
        node.label = "prot" + id
        node.uniprot_id = "None"
    }
}

async function fetch_molecule_ChEMBL(node,id){
    let json = await fetch("https://www.ebi.ac.uk/chembl/api/data/molecule/" + id + ".json")
        .then((response) => response.json());
    
    node.label = json.pref_name;
}

async function fetch_assay_ChEMBL(node,id){
    let json = await fetch("https://www.ebi.ac.uk/chembl/api/data/assay/" + id + ".json")
        .then((response) => response.json());
    //console.log(json)
    node.label = "ASSAY_" + id; //à adapter
}
