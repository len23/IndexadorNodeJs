var request = require('request');

var consultaSPARQL = "PREFIX id:<http://ieee.rkbexplorer.com/id/>PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>PREFIX akt:  <http://www.aktors.org/ontology/portal#>PREFIX owl:  <http://www.w3.org/2002/07/owl#>PREFIX akt:  <http://www.aktors.org/ontology/portal#>PREFIX akts: <http://www.aktors.org/ontology/support#>PREFIX iai:  <http://www.iai.uni-sb.de/resist#>PREFIX extn: <http://www.aktors.org/ontology/extension#>SELECT DISTINCT ?articulo ?titulo ?abstract WHERE {?articulo rdf:type akt:Proceedings-Paper-Reference.?articulo akt:has-title ?titulo.?articulo rdf:type   akt:Proceedings-Paper-Reference.OPTIONAL {?articulo extn:has-abstract ?abstract}}";
var encodeSPARQL=encodeURI(consultaSPARQL);

 array = [ 
  {titulo:'asdsad',abstracto:'asd'}
 ]
 
function callback(error, response, body) {
  console.log('EL bodysito: ',body);
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    
  }else{
    console.log('El body es: ',body);
  }
}
 
// request.post(options,JSON.stringify(array), callback);

var options = {
    url: "http://localhost:8080/JavaAPI/api/articulos/indexIEEE",
    method: "POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(array)
}



var getArticles = {
  
  url: "http://ieee.rkbexplorer.com/sparql/?format=json&query="+"PREFIX+id%3A+++<http%3A%2F%2Fieee.rkbexplorer.com%2Fid%2F>%0D%0APREFIX+rdf%3A++<http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23>%0D%0APREFIX+rdfs%3A+<http%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23>%0D%0APREFIX+akt%3A++<http%3A%2F%2Fwww.aktors.org%2Fontology%2Fportal%23>%0D%0APREFIX+owl%3A++<http%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23>%0D%0APREFIX+akt%3A++<http%3A%2F%2Fwww.aktors.org%2Fontology%2Fportal%23>%0D%0APREFIX+akts%3A+<http%3A%2F%2Fwww.aktors.org%2Fontology%2Fsupport%23>%0D%0APREFIX+iai%3A++<http%3A%2F%2Fwww.iai.uni-sb.de%2Fresist%23>%0D%0APREFIX+extn%3A+<http%3A%2F%2Fwww.aktors.org%2Fontology%2Fextension%23>%0D%0ASELECT+DISTINCT+%3Farticulo+%3Ftitulo+%3Fabstract+WHERE+{+%0D%0A++%3Farticulo+rdf%3Atype+akt%3AProceedings-Paper-Reference.%0D%0A++%3Farticulo+akt%3Ahas-title+%3Ftitulo.%0D%0A++%3Farticulo+rdf%3Atype+++akt%3AProceedings-Paper-Reference.%0D%0A++OPTIONAL+{%3Farticulo+extn%3Ahas-abstract+%3Fabstract}%0D%0A}%0D%0A",
  method: "GET",
  headers:{
    "Content-Type":"application/json"
  },
}

/* request(options, callback) */ //importante para empezar con la indexacion
request(getArticles, callback);
/* 
PREFIX id:   <http://ieee.rkbexplorer.com/id/>
PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX akt:  <http://www.aktors.org/ontology/portal#>
PREFIX owl:  <http://www.w3.org/2002/07/owl#>
PREFIX akt:  <http://www.aktors.org/ontology/portal#>
PREFIX akts: <http://www.aktors.org/ontology/support#>
PREFIX iai:  <http://www.iai.uni-sb.de/resist#>
PREFIX extn: <http://www.aktors.org/ontology/extension#>
SELECT DISTINCT ?articulo ?titulo ?abstract ?fecha_literal WHERE {
  ?articulo rdf:type akt:Proceedings-Paper-Reference;
            akt:has-title ?titulo;
            rdf:type   akt:Proceedings-Paper-Reference;
            akt:has-date ?fecha.
  ?fecha    akts:has-pretty-name ?fecha_literal.
  OPTIONAL {?articulo extn:has-abstract ?abstract}
} */