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
            } else if (id.startsWith("p(")) {
                node = new Catalyst(id);
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

    async create_edge_from_ids(source_id, target_id){
        let source = await this.create_node(source_id);
        let target = await this.create_node(target_id);
        return this.create_edge(source, target);
    }

    get_pathways(){
        // return a list of pathways contained in the graph
    }

    extract_pathways(pathways){
        // return catalysts and metabolites associated to thaose pathways
        let out = new Set();
        let catalysts = new Set();
        // collect catalysts
        for (let data of GRAPH.elements){
            if(data.class == "association"){
                if(pathways.includes(data.target.id)){    
                    catalysts.add(data.source)
                }
                else if(pathways.includes(data.source.id)){
                    catalysts.add(data.target)
                }    
            }
        }
        // collect metabolites
        for (let data of GRAPH.elements){
            if(data.class == "association"){
                if(catalysts.has(data.target) || catalysts.has(data.source)){
                    out.add(data);
                    out.add(data.source);
                    out.add(data.target);
                }
            }
        }
        return out;
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
    constructor(id, class_name, label, name) {
        super(id, class_name),
            this.label = label,
            this.name = name
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
        this.was_fetched=false;
    }
}

class Catalyst extends Displayable_node {
    constructor(id) {
        super(id, "macromolecule", "label", false);
    }
}

class Metabolite extends Displayable_node {
    constructor(id) {
        super(id, "simple chemical", "label", false);
    }
}
