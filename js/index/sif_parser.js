

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
