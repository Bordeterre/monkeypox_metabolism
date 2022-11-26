

async function query_database(node){
    if(node.was_fetched){
        return;
    }
    let database = node.id.split(":")[0];
    let id = node.id.split(":")[1].slice(0, -1);

    switch (database){
        //case "p(HGNC:CHEMBL" : console.log("HGNC:CHEMBL" ); await fetch_molecule_ChEMBL(node,id) ; break;
        case "p(HGNC" : console.log("HGNC"); await fetch_protein_HGNC(node,id) ; break;    ///console.log à enlever plus tard
        
        case "a(ChEMBL" : console.log("ChEMBL"); await fetch_molecule_ChEMBL(node,id) ; break;
        case "a(ChEMBLAssay" : console.log("Assay"); await fetch_assay_ChEMBL(node,id) ; break;
        default : console.log("Fetch error, unrecognized database !!! " + database); //console.log(database);
    }
    /*let json2 = await fetch("https://www.ebi.ac.uk/chembl/api/data/chembl_id_lookup/CHEMBL2363073.json")
            .then((response) => response.json());*/
    //console.log(json2);
    node.was_fetched = true;
}


async function fetch_protein_HGNC(node,id){
    let json = await fetch("https://rest.genenames.org/fetch/symbol/" + id, {headers :{'Accept': 'application/json'}})
        .then((response) => response.json());
    console.log(json.response.numFound);
    console.log(json);
    
    
    if (json.response.numFound != 0){
        node.label = json.response.docs[0].name;
        node.uniprot_id = json.response.docs[0].uniprot_ids;
        //console.log("nom : " + node.label);
    }

    else{
        let json2 = await fetch("https://www.ebi.ac.uk/chembl/api/data/chembl_id_lookup/" + id + ".json")
            .then((response) => response.json()); // trouver comment récupérer le numéro de réponse quand ça marche pas sans que ça bug
        let urlnext = json2.resource_url;
        //entity_type = json2.response.
        console.log(json2);

    }



                                                //       /chembl/api/data/chembl_id_lookup/CHEMBL2363073
    //else if (id.startsWith("CHEMBL")){
    /*else {
        let json = await fetch("https://www.ebi.ac.uk/chembl/api/data/target/" + id + ".json")
            .then((response) => response.json());
        if(json.response.numFound != 0) {
            console.log("entrée dans le else if"); /*
            let json = await fetch("https://www.ebi.ac.uk/chembl/api/data/target/" + id + ".json")
                .then((response) => response.json());
            console.log("test pour mol CHEMBL");
            console.log(json); 
        }
        else {
                console.log("entrée dans le else");
                console.log("prot_" + id);
                node.label = "prot_" + id;
            }

    }

   
    
}
    
    else {
        // temporary notation to understand why it is not found
        //let json2 = await fetch("https://rest.genenames.org/search/symbol:" + id, {headers :{'Accept': 'application/json'}})
        //    .then((response) => response.json());

        
        //console.log("nom : " + json.pref_name);
        //node.label = json.pref_name;
        
        node.label = "prot_" + id;
        //node.uniprot_id = "None";
        
        console.log(id);
        
        /*
        console.log("test nom search : ");
        console.log(json2);
        
    }
*/    
}

async function fetch_molecule_ChEMBL(node,id){
    let json = await fetch("https://www.ebi.ac.uk/chembl/api/data/molecule/" + id + ".json")
        .then((response) => response.json());
    //console.log(json);
    //console.log("nom : " + json.pref_name);
    node.label = json.pref_name;
}

async function fetch_assay_ChEMBL(node,id){
    let json = await fetch("https://www.ebi.ac.uk/chembl/api/data/assay/" + id + ".json")
        .then((response) => response.json());
    //console.log("nom : ASSAY" + id);
    //node.label = "ASSAY_" + id; //à adapter
    
    let name = json.description;
    console.log(name);
    let array_name = name.split("\u0020");

    //let cut_name = name.split("\u0020")[0].slice(0,5);
    let sliced_name = array_name.slice(0,5);
    let cut_name = sliced_name.join("\u0020");
    node.label = cut_name;
    
    /*
    let database = node.id.split(":")[0];
    let id = node.id.split(":")[1].slice(0, -1);
    node.label = json.description;*/
}
