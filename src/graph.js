class Graph {
    constructor() {
        this.elements = []
    }

    search_element(id) {
        return this.elements.find(e => e.id === id);
    }

    async create_node(id) {
        let node = this.search_element(id)

        if (typeof node === "undefined") {
            if (id.startsWith("a(")) {
                node = new Metabolite(id);
                await node.fetch_from_Chembl();
            } else if (id.startsWith("p(")) {
                node = new Protein(id);
                await node.fetch_from_Chembl();
            } else if (id.startsWith("bp(")) {
                node = new Pathway(id);
            }

            if (typeof node !== "undefined") {
                this.elements.push(node);
            }
        }
        return node;
    }

    create_edge(source, target) {
        if (typeof source === "undefined" || typeof target === "undefined") {
            return undefined;
        }

        let edge = this.search_element(source.id + "=>" + target.id)

        if (typeof edge === "undefined") {
            edge = new Edge(source, target);
            this.elements.push(edge);
        }

        return edge;
    }

    async from_sif(file, pathways_of_interest) {
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
}

class Graph_element {
    constructor(id, class_name) {
        this.id = id,
            this.class = class_name
    }
}

class Edge extends Graph_element {
    constructor(source, target) {
        super(source.id + "=>" + target.id, "association"),
            this.source = source,
            this.target = target,
            this.cardinality = 0
    }
}

class Node extends Graph_element {
    constructor(id, class_name, label) {
        super(id, class_name),
            this.label = label
    }
}

class Pathway extends Node {
    constructor(id) {
        super(id, "pathway", id)
    }
}

class Displayable_node extends Node {
    constructor(id, class_name, label, clonemarker) {
        super(id, class_name, label, clonemarker)
    }


}

class Protein extends Displayable_node {
    constructor(id) {
        super(id, "macromolecule", "label", false);
    }

    async fetch_from_Chembl() {
        let id_CHembl = this.id.split(":")[1].slice(0, -1);
        let json = await fetch("https://www.ebi.ac.uk/chembl/api/data/target/search.json?target_type=SINGLE%20PROTEIN&(species:'Homo%20sapiens')%20OR%20(species:'Monkeypox%20virus')&q=" + id_CHembl)
            .then((response) => response.json());
        //console.log(json.targets[0])
        this.label = json.targets[0].pref_name;
        if (json.targets[0].cross_references.length > 0) {
            this.uniprot_id = json.targets[0].cross_references[0].xref_id;
        } else {
            this.uniprot_id = null;
        }
    }
}

class Metabolite extends Displayable_node {
    constructor(id) {
        super(id, "simple chemical", "label", false);
    }

    async fetch_from_Chembl() {
        let id_CHembl = this.id.split(":")[1].slice(0, -1);

        //avec la première recherche on récupère la bonne url comme c'est pas toujours le meme type de molecule
        let json = await fetch("https://www.ebi.ac.uk/chembl/api/data/chembl_id_lookup/search.json?&q=" + id_CHembl)
            .then((response) => response.json());
        //console.log(json.chembl_id_lookups[0].entity_type)

        // si c'est pas un assay on va sur l'url et on recupere le nom
        if (json.chembl_id_lookups[0].entity_type != "ASSAY") {
            let json_metabolite = await fetch("https://www.ebi.ac.uk/chembl/api/data/molecule/search.json?&q=" + id_CHembl)
                .then((response) => response.json());
            //console.log(json_metabolite.molecules[0] )
            //console.log(json_metabolite.molecules[0].pref_name)
            this.label = json_metabolite.molecules[0].pref_name;
        }
        // si c'est un assay on met pas de nom (y en a pas), j'ai fait un mix mais on peut changer
        else {
            this.label = "ASSAY_" + id_CHembl; //à adapter
        }
    }
}
