//import sbgnStylesheet from 'cytoscape-sbgn-stylesheet';
//import cytoscape from 'cytoscape';
//import sbgnStylesheet from 'cytoscape-sbgn-stylesheet';
//import { sbgnStylesheet} from 'cytoscape-sbgn-stylesheet'; //from '/home/bluwen/node_modules/cytoscape-sbgn-stylesheet/build/bundle';
/*0: Object { target: "a(ChEMBLAssay:CHEMBL3294635)", source: "p(HGNC:AHCY)", intType: "association" }
1: Object { target: "a(ChEMBLAssay:CHEMBL3294636)", source: "p(HGNC:AHCY)", intType: "association" }
2: Object { target: "a(ChEMBLAssay:CHEMBL800629)", source: "p(HGNC:AHCY)", intType: "association" }
3: Object { target: "bp(Reactome:Methylation.)", source: "p(HGNC:AHCY)", intType: "association" }
4: Object { target: "bp(Reactome:\"Sulfur amino acid metabolism.\")", source: "p(HGNC:AHCY)", intType: "association" }
5: Object { target: "bp(Reactome:\"Metabolism of ingested SeMet, Sec, MeSec into H2Se.\")", source: "p(HGNC:AHCY)", intType: "association" }
6: Object { target: "bp(Reactome:\"Defective AHCY causes HMAHCHD.\")", source: "p(HGNC:AHCY)", intType: "association" }
7: Object { target: "bp(GOMF:\"adenosylhomocysteinase activity\")", source: "p(HGNC:AHCY)", intType: "association" }
8: Object { target: "bp(GOBP:\"one-carbon metabolic process\")", source: "p(HGNC:AHCY)", intType: "association" }
9: Object { target: "bp(GOBP:\"S-adenosylmethionine cycle\")", source: "p(HGNC:AHCY)", intType: "association" }
10: Object { target: "a(ChEMBLAssay:CHEMBL804128)", source: "p(HGNC:AHCY)", intType: "association" }
11: Object { target: "a(ChEMBLAssay:CHEMBL803150)", source: "p(HGNC:AHCY)", intType: "association" }
12: Object { target: "a(ChEMBLAssay:CHEMBL800520)", source: "p(HGNC:AHCY)", intType: "association" }
13: Object { target: "a(ChEMBLAssay:CHEMBL798951)", source: "p(HGNC:AHCY)", intType: "association" }
14: Object { target: "a(ChEMBLAssay:CHEMBL827105)", source: "p(HGNC:AHCY)", intType: "association" }
15: Object { target: "a(ChEMBLAssay:CHEMBL1676754)", source: "p(HGNC:AHCY)", intType: "association" }*/

//let sbgnStylesheet = require('./build/bundle.js');
/*import cytoscape from "./cytoscape";

import CytoscapeComponent from "react-cytoscapejs";*/
//import sbgnStylesheet from "/home/bluwen/package.json";

let cy = cytoscape({
    container: document.getElementById('cy'),
    elements: [
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
      ],
      style: cytoscapeSbgnStylesheet(cytoscape), /*[
          {
              selector: 'node',
              style: {
                  shape: 'hexagon',
                  'background-color': 'red',
                  label: 'data(id)'
              }
          }]  */    
  });
  
  cy.layout({
    name: 'circle'
}).run();



  