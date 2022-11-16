

/////////////////////////////////////////////////     FUNCTIONS     ////////////////////////////////////////////////

function initialize(){
    let form = document.createElement("input");
    form.setAttribute("type","file");
    form.setAttribute("class","browse");
    form.setAttribute("id","upload_input");
    form.addEventListener("change", on_file_upload);

    let upload_zone = document.getElementById("upload_zone");
    upload_zone.appendChild(form);
}

async function on_file_upload(ev){
    // Codé en dur pour l'instant, à remplacer par un choix interactif de l'utilisateur et/ou une config file
    //let filter_nodes = ['bp(Reactome:"Defective AHCY causes HMAHCHD.")','bp(Reactome:"Sulfur amino acid metabolism.")','bp(GOBP:"one-carbon metabolic process")'];
    let file = ev.target.files[0];
    //await GRAPH.from_sif(file, filter_nodes)
    await build_graph_from_sif(GRAPH, file);
    console.log(GRAPH);
    file = write_json(GRAPH);
    //downloadObjectAsJson(file,"cc");
    //load_json(file);
    //display_graph()

    // Créer boutons et eventlisteners pour sélectionner des paths à filtrer
}

async function on_pathway_selection(ev){
    //affiche le graphe avec juste les pathways dont on a besoin
}
async function display_graph(){
    //let json = write_json(GRAPH).elements;
    

    let json = [
        // nodes
        /*"data": {
            "id": "glyph23",                   // id of the node
            "class": "simple chemical",        // class of the node (see classes section for a list of supported sbgn glyphs
            "label": "Ca2+",                   // label to be displayed on the node
            "parent": "glyph2",                // parent node id if any
            "clonemarker": false,              // whether the node has a clonemarker or not
            "stateVariables": [],              // an array of state variables
            "unitsOfInformation": [],          // an array of units of information
          }*/
        { data: { 
            id: 'a(ChEMBLAssay:CHEMBL3294635)',
            class: 'simple chemical',
            label: 'CHEMBL3294635',
            clonemarker:"false",
            stateVariables: [],
            unitsOfInformation: [],
        } 
    },
        //{ data: { id: 'a(ChEMBLAssay:CHEMBL3294636)' } },
        { data: { 
            id: 'p(HGNC:AHCY)',
            class: 'macromolecule',
            label: 'AHCY',
            clonemarker:"false",
            stateVariables: [],
            unitsOfInformation: [],
        } 
    },
      { data: { 
        id: 'a(ChEMBLAssay:CHEMBL3294636)',
        class: 'simple chemical',
        label: 'CHEMBL3294636',
        clonemarker:"false",
        stateVariables: [],
        unitsOfInformation: [],
      } 
    },
      { data: { 
        id: 'a(ChEMBLAssay:CHEMBL800629)',
        class: 'simple chemical',
        label: 'CHEMBL800629',
        clonemarker:"false",
        stateVariables: [],
        unitsOfInformation: [],
      } 
    },
      { data: { 
        id: 'bp(Reactome:Methylation.)',
        class: 'process',
        label: 'Reactome:Methylation',
        clonemarker:"false",
        stateVariables: [],
        unitsOfInformation: [],
      } 
    },
        //{ data: { id: 'a(ChEMBLAssay:CHEMBL800629)' } },
        //{ data: { id: 'bp(Reactome:Methylation.)' } },
        //{ data: { id: 'bp(Reactome:\"Sulfur amino acid metabolism.\")' } },
        // edges
        /*"data": {
            "id": "glyph19-glyph5",            // id
            "class": "production",             // sbgn class
            "cardinality": 0,                  // cardinality
            "source": "glyph19",               // source node id
            "target": "glyph5",                // target node id
            "portSource": "glyph19",           // port of the source
            "portTarget": "glyph5"             // port of the target
          }*/
        /*1: Object { target: "a(ChEMBLAssay:CHEMBL3294636)", source: "p(HGNC:AHCY)", intType: "association" }
    2: Object { target: "a(ChEMBLAssay:CHEMBL800629)", source: "p(HGNC:AHCY)", intType: "association" }
    3: Object { target: "bp(Reactome:Methylation.)", source: "p(HGNC:AHCY)", intType: "association" }*/ 
        {
          data: {
            id: 'association',
            class: "association",
            cardinality: 0, 
            source: 'p(HGNC:AHCY)',
            target: 'a(ChEMBLAssay:CHEMBL3294635)'
          }
        },        
        {
          data: {
            id: 'association',
            class: "association",
            cardinality: 10, 
            source: 'p(HGNC:AHCY)',
            target: 'a(ChEMBLAssay:CHEMBL3294636)'
          }
        },
        {
          data: {
            id: 'association',
            class: "association",
            cardinality: 20, 
            source: 'p(HGNC:AHCY)',
            target: 'a(ChEMBLAssay:CHEMBL800629)'
          }
        },
        {
          data: {
            id: 'association',
            class: "association",
            cardinality: 30, 
            source: 'p(HGNC:AHCY)',
            target: 'bp(Reactome:Methylation.)'
          }
        },
        /*
        {
          data: {
            id: 'association_1',
            source: 'a(ChEMBLAssay:CHEMBL3294636)',
            target: 'p(HGNC:AHCY)'
          }
        },
        {
          data: {
            id: 'association_2',
            source: 'a(ChEMBLAssay:CHEMBL800629)',
            target: 'p(HGNC:AHCY)'
          }
        },
        {
          data: {
            id: 'association_3',
            source: 'bp(Reactome:Methylation.)',
            target: 'p(HGNC:AHCY)'
          }
        },
        {
          data: {
            id: 'association_4',
            source: 'bp(Reactome:\"Sulfur amino acid metabolism.\")',
            target: 'p(HGNC:AHCY)'
          }
        }*/
      ]
    let cy = cytoscape({
        container : document.getElementById("graph_display"),
        elements : json,
        style : cytoscapeSbgnStylesheet(cytoscape),
        
    });

    console.log(cy);
    cy.layout({name: "circle"}).run();

}

///////////////////////////////////////////////////     MAIN     ///////////////////////////////////////////////////
const GRAPH = new Graph();
initialize();