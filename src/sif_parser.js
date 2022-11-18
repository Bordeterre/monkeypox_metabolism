

async function build_graph_from_sif(graph, file) {
    let raw_text = await file.text();
    let lines = raw_text.split("\r").join(""); // makes compatible with windows
    lines = lines.split("\n").map(function(x){return x.split("\t")});
    let pathways = []
    for (let l = 0; l < lines.length; l++) {
        let source = lines[l][0];
        let target = lines[l][2];

        await graph.create_edge_from_ids(source, target);
        if (source.startsWith("bp(") && !pathways.includes(source)){
            pathways.push(source)
        }
        if (target.startsWith("bp(") && !pathways.includes(target)){
            pathways.push(target)
        }

    }
    return pathways
}

/*
async function from_sif(file, pathways_of_interest) {
    let raw_text = await file.text();
    let lines = raw_text.split("\r").join(""); // Enlève les \r si l'utilisateur est en windows
    lines = lines.split("\n").map(function (x) {
        return x.split("\t")
    });

    // stocke les noms des pathways ou prot qui seront en lien avec les metabolites
    let path_and_prot_of_interest = []

    //Collecte les protéines en intéraction avec les pathways d'intérêt.
    for (let l = 0; l < lines.length; l++) {
        let source = lines[l][0];
        let target = lines[l][2];

        if (pathways_of_interest.includes(source) || pathways_of_interest.includes(target)) {
            let source_node = await this.create_node(source);
            let target_node = await this.create_node(target);
            this.create_edge(source_node, target_node);

            // ajout des noms d'interet pour recuperer les metabolites sans parcourir les elements
            if (!path_and_prot_of_interest.includes(source)) {
                path_and_prot_of_interest.push(source);
            }
            if (!path_and_prot_of_interest.includes(target)) {
                path_and_prot_of_interest.push(target);
            }
        }
    }

    // Collecte les métabolites en intéraction avec les protéines collectées
    for (let l = 0; l < lines.length; l++) {
        let source = lines[l][0];
        let target = lines[l][2];
        if (path_and_prot_of_interest.includes(source) || path_and_prot_of_interest.includes(target)) {
            if (source.startsWith("a(") || target.startsWith("a(")) {
                let source_node = await this.create_node(source);
                let target_node = await this.create_node(target);
                this.create_edge(source_node, target_node);
            }
        }
    }
}

*/