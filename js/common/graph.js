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
        let pathways = []
        for (let data of this.elements){
            if(data.class != "association" && data.id.startsWith("bp(")){
                pathways.push(data.id)
            }
        }
        return pathways
    }

    async extract_pathways(pathways){
        let out = new Set();
        let catalysts = new Set();
        let keptIds = new Set();
        for (let data of this.elements){
            if (data.class == "association"){
                if (pathways.includes(data.target.id)){
                    if (!keptIds.has(data.source.id)){
                        catalysts.add(data.source);
                        keptIds.add(data.source.id);
                    }
                }
                else if (pathways.includes(data.source.id)){
                    if (!keptIds.has(data.target.id)){
                        catalysts.add(data.target);
                        keptIds.add(data.target.id);
                    }
                }
            }
        }
        for (let data of this.elements){
            let iter = catalysts.values();
            for (let j of iter){
                if (data.id == j.id){
                    out.add(data);
                }
            }
           
            if (data.class == "association"){
                if(keptIds.has(data.target.id) || keptIds.has(data.source.id)){
                    if (!keptIds.has(data.id)){
                        out.add(data);
                        keptIds.add(data.id);
                    }
                    if (!keptIds.has(data.source.id)){
                        out.add(data.source);
                        keptIds.add(data.source.id);
                    }
                    if (!keptIds.has(data.target.id)){
                        out.add(data.target);
                        keptIds.add(data.target.id);
                    }

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
