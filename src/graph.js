class Graph {
    constructor() {
        this.elements = []
    }

    search_element(id){
        return this.elements.find(e => e.id === id);  
    }

    async create_node(id){
        let node = this.search_element(id)

        if(typeof node === "undefined"){
            if(id.startsWith("a(")){
                node = new Metabolite(id);
                await node.fetch_from_Chembl(); 
            }
            else if(id.startsWith("p(")){
                node = new Protein(id);
                await node.fetch_from_Chembl();
            }
            else if(id.startsWith("bp(")){
                node = new Pathway(id);
            }

            if (typeof node !== "undefined"){
                this.elements.push(node);
            }
        }
        return node;
    }

    create_edge(source, target){
        if(typeof source === "undefined" || typeof target === "undefined"){
            return undefined;
        }

        let edge = this.search_element(source.id + "=>" + target.id)

        if(typeof edge === "undefined"){
            edge = new Edge(source, target);
            this.elements.push(edge);
        }

        return edge;
    }
    
    async from_sif(file, pathways_of_interest){
        let raw_text = await file.text();
        let lines = raw_text.split("\r\n").map(function(x){return x.split("\t")});

        //Collecte les protéines en intéraction avec les pathways d'intérêt.
        for(let l = 0; l < lines.length; l++){
            let source = lines[l][0];
            let target = lines[l][2];

            if(pathways_of_interest.includes(source) || pathways_of_interest.includes(target)){
                let source_node = await this.create_node(source);
                let target_node = await this.create_node(target);
                this.create_edge(source_node, target_node);
            }
        }
        // Collecte les métabolites en intéraction avec les protéines collectées
        /* TO DO (s'inspirer du code de parseur.js)*/
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
        super(source.id + "=>" + target.id,"association"),
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
    constructor(id, class_name, label, clonemarker){
        super(id, class_name, label, clonemarker)
    }

    
}

class Protein extends Displayable_node {
    constructor(id){
        super(id, "macromolecule", "label", false);
    }

    async fetch_from_Chembl(){
        let id_CHembl = this.id.split(":")[1].slice(0, -1);
        let json = await fetch("https://www.ebi.ac.uk/chembl/api/data/target/search.json?organism=Homo%20sapiens&q=" + id_CHembl)
        .then((response) => response.json());
        //console.log(json.targets[0])
        this.label = json.targets[0].pref_name;
        if(json.targets[0].cross_references.length > 0){
            this.uniprot_id = json.targets[0].cross_references[0].xref_id;
        } else {
            this.uniprot_id = null;
        }
    }
}

class Metabolite extends Displayable_node {
    constructor(id){
        super(id, "simple chemical", "fetch_CHembl(id)", "fetch_CHembl(id)")
    }

    async fetch_from_Chembl(){

    }
}

