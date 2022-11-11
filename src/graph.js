class Graph {
    constructor() {
        this.elements = []
    }

    is_element_present(id){
        if (this.elements.find(e => e.id === id)){
            return true;
        }
        
        return false;
    }

    create_node(id){
        if(this.is_element_present(id)){
            return;
        }

        if(id.startsWith("p(")){
            this.elements.push(new Protein(id));
        }
        else if(id.startsWith("a(")){
            this.elements.push(new Metabolite(id));
        }
    }

    create_edge(source, target){
        if(this.is_element_present(source + "=>" + target)){
            return;
        }
        this.elements.push(new Edge(source, target));
    }
    
    async from_sif(file, pathways_of_interest){
        let raw_text = await file.text();
        let lines = raw_text.split("\r\n").map(function(x){return x.split("\t")});

        //Collecte les protéines en intéraction avec les pathways d'intérêt.
        for(let l = 0; l < lines.length; l++){
            let source = lines[l][0];
            let target = lines[l][2];

            if(pathways_of_interest.includes(source) || pathways_of_interest.includes(target)){
                this.create_node(source)
                this.create_node(target)
                this.create_edge(source, target);
            }
        }
        // Collecte les métabolites en intéraction avec les protéines collectées
        /* TO DO (s'inspirer du code de parseur.js) */
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
        super(source + "=>" + target,"association"),
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
        super(id, "macromolecule", "fetch_CHembl(id)", false)
    }
}

class Metabolite extends Displayable_node {
    constructor(id){
        super(id, "simple chemical", "fetch_CHembl(id)", "fetch_CHembl(id)")
    }
}

