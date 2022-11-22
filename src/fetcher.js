
async function query_database(node){
    if(node.was_fetched){
        return;
    }
    let database = node.id.split(":")[0];
    let id = node.id.split(":")[1].slice(0, -1);
    
    display_fetch_in_progress(id);

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

async function fetch_protein_uniprot(node,id){
    // Pas encore au point du tout
    console.log(node.id);
    let json = await fetch("https://rest.uniprot.org/uniprotkb/search?query=(gene:"+id+")",{headers :{'Accept': 'application/json'}}) //(taxonomy_id:10244)AND
        .then((response) => response.json());
    console.log(json);
}
