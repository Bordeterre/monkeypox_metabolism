
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
        case "p(MPXV" : await fetch_MPXV_protein_uniprot(node,id) ; break;
        default : console.log("Fetch error, unrecognized database !!! " + database + "  id : " + id);
    }
    node.was_fetched = true;
}

async function fetch_protein_HGNC(node,id){
    let json = await fetch("https://rest.genenames.org/fetch/symbol/" + id, {headers :{'Accept': 'application/json'}})
        .then((response) => response.json());

    if (json.response.numFound != 0){
        node.label = json.response.docs[0].name;
        node.name = json.response.docs[0].name;
        node.uniprot_id = json.response.docs[0].uniprot_ids;
    }
    else{
        try {
            let json2 = await fetch("https://www.ebi.ac.uk/chembl/api/data/chembl_id_lookup/" + id + ".json")
                .then((response) => response.json());
            let json3 = await fetch("https://www.ebi.ac.uk" + json2.resource_url + ".json")
                .then((response) => response.json());
            node.label = json3.organism + " " + json3.pref_name;
            node.name = json3.organism + " " + json3.pref_name;
        } catch (e){
            node.label = "protein_" + id;
            node.name = "protein_" + id;
        }
    }
}

async function fetch_molecule_ChEMBL(node,id){
    let json = await fetch("https://www.ebi.ac.uk/chembl/api/data/molecule/" + id + ".json")
        .then((response) => response.json());
    node.label = json.pref_name;
    node.name = json.pref_name;
}

async function fetch_assay_ChEMBL(node,id){
    let json = await fetch("https://www.ebi.ac.uk/chembl/api/data/assay/" + id + ".json")
        .then((response) => response.json());
    let name = json.description;
    let array_name = name.split("\u0020");
    
    if (array_name[0].startsWith("PUB")){
        let sliced_name = array_name.slice(2,7);
        let cut_name = sliced_name.join("\u0020");
        node.label = cut_name;
        node.name = name;
    }
    else {
        let sliced_name = array_name.slice(0,5);
        let cut_name = sliced_name.join("\u0020");
        node.label = cut_name;
        node.name = name;
    }
}

async function fetch_MPXV_protein_uniprot(node, id){
    try {
    let json = await fetch("https://rest.uniprot.org/uniprotkb/" + id, {headers :{'Accept': 'application/json'}})
        .then((response) => response.json());
    let name = json.organism.commonName + " " + json.proteinDescription.recommendedName.fullName.value;
    node.label = name;
    node.name = name;
    } catch (e){
        node.label = "MPXV_protein_" + id;
        node.name = "MPXV_protein_" + id;
    }
}