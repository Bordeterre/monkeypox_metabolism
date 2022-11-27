
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
    }/*
    let json2 = fetch("https://www.ebi.ac.uk/chembl/api/data/molecule/search?q=CHEMBL152.json")
    .then((response) => response.json());
    console.log(json2);*/
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
        console.log("nom : " + node.label);
    }

    //https://www.ebi.ac.uk/chembl/api/data/assay?assay_type__exact=B
    else{
        /*
        let json2 = await fetch("https://www.ebi.ac.uk/chembl/api/data/chembl_id_lookup/" + id + ".json")
            .then((response) => response.json()); // trouver comment récupérer le numéro de réponse quand ça marche pas sans que ça bug
        let urlnext = json2.resource_url;
        let json3 = await fetch("https://www.ebi.ac.uk/chembl/api/data/chembl_id_lookup/" + urlnext + ".json")
            .then((response) => response.json());
        if json3.targets
        node.label = json3.response.docs[0].name;
        //entity_type = json2.response.
        console.log(json2);

        let json2 = await fetch("https://www.ebi.ac.uk/chembl/api/data/chembl_id_lookup?_type__exact=" + id + ".json")
            .then((response) => response.json());
        console.log(json2);*/
        console.log("entrée dans le else");
        let json2 = await fetch("https://www.ebi.ac.uk/chembl/api/data/chembl_id_lookup/search?q=" + id + ".json")
            .then((response) => response.json());
        console.log("voir si ça prend le json2");
        for (let i = 0; i < json2.chembl_id_lookups.length; i++){
            let temp = json2.chembl_id_lookups[i].resource_url;
            let splited = temp.split("/");
            if (splited[splited.length - 1] == id) {
                let json3 = await fetch("https://www.ebi.ac.uk" + temp + id + ".json")
                    .then((response) => response.json());
                if (json2.chembl_id_lookups[i].entity_type == "TARGET"){
                    node.label = json3.pref_name + " " + json3.organism;
                }
                else if (json2.chembl_id_lookups[i].entity_type == "COMPOUND"){
                    node.label = json3.pref_name;
                }
            }
        }      
        if (node.label == null){
            console.log("entrée dans le if null");
            console.log("prot_" + id);
            node.label = "prot_" + id;
        } 
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
