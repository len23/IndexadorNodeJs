var request = require('request');

 
 //Funcion callback para obtener los articulos del repositorio RKBExplorer
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
   var info = JSON.parse(body);
   url=(info.results.bindings[0].articulo.value).split("/")[2];
   if(url="ieee.rkbexplorer.com"){
    urlPost="http://localhost:8080/JavaAPI/api/articulos/indexIEEE";
   }else if(url="acm.rkbexplorer.com"){
    urlPost="http://localhost:8080/JavaAPI/api/articulos/indexACM";
   }else{
      urlPost="http://localhost:8080/JavaAPI/api/articulos/indexDBLP";
   }
   console.log(url);
    var arrayArticulos=[];
   console.log('info',info.results.bindings);
   console.log(info.results.bindings[0]);
      info.results.bindings.forEach(element => {
      if(element.abstract.value!=null)
      arrayArticulos.push({"titulo":element.titulo.value,'abstracto':element.abstract.value});
      else
      arrayArticulos.push({"titulo":element.titulo.value,'abstracto':''});

    }); 
    //console.log('Arrays: ',arrayArticulos[2602]);
      var options = {
      url: "http://localhost:8080/JavaAPI/api/articulos/indexDBLP",
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(arrayArticulos)
  }
  console.log(arrayArticulos);

  setTimeout(() => {
    request.post(options,callbackPost);
  }, 5000); 

  }else{
    console.log('El body es: ',body);
  }
}

 //Funcion callback para indexar los articulos en el servidor local
function callbackPost(error, response, body) {
  //console.log('EL bodysito: ',body);
  if (!error && response.statusCode == 201) {
    console.log('Es exito');
  // console.log('info',info);
  }else{
    console.log(response.statusCode);
  }
}
 
 
 //request.post(options,JSON.stringify(array), callback);

/* var options = {
    url: "http://localhost:8080/JavaAPI/api/articulos/indexIEEE",
    method: "POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(arrayArtículos)
} */



var getArticlesIEEE = {
  
  url: "http://ieee.rkbexplorer.com/sparql/?format=json&query="+"PREFIX+id%3A+++<http%3A%2F%2Fieee.rkbexplorer.com%2Fid%2F>%0D%0APREFIX+rdf%3A++<http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23>%0D%0APREFIX+rdfs%3A+<http%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23>%0D%0APREFIX+akt%3A++<http%3A%2F%2Fwww.aktors.org%2Fontology%2Fportal%23>%0D%0APREFIX+owl%3A++<http%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23>%0D%0APREFIX+akt%3A++<http%3A%2F%2Fwww.aktors.org%2Fontology%2Fportal%23>%0D%0APREFIX+akts%3A+<http%3A%2F%2Fwww.aktors.org%2Fontology%2Fsupport%23>%0D%0APREFIX+iai%3A++<http%3A%2F%2Fwww.iai.uni-sb.de%2Fresist%23>%0D%0APREFIX+extn%3A+<http%3A%2F%2Fwww.aktors.org%2Fontology%2Fextension%23>%0D%0ASELECT+DISTINCT+%3Farticulo+%3Ftitulo+%3Fabstract+WHERE+{+%0D%0A++%3Farticulo+rdf%3Atype+akt%3AProceedings-Paper-Reference.%0D%0A++%3Farticulo+akt%3Ahas-title+%3Ftitulo.%0D%0A++%3Farticulo+rdf%3Atype+++akt%3AProceedings-Paper-Reference.%0D%0A++OPTIONAL+{%3Farticulo+extn%3Ahas-abstract+%3Fabstract}%0D%0A}LIMIT+1%0D%0A",
  method: "GET",
  headers:{
    "Content-Type":"application/json"
  },
  repositorio:"IEEE"
}

var getArticlesACM = {
  
  url: "http://acm.rkbexplorer.com/sparql/?format=json&query=PREFIX+id%3A+++<http%3A%2F%2Facm.rkbexplorer.com%2Fid%2F>%0D%0APREFIX+rdf%3A++<http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23>%0D%0APREFIX+rdfs%3A+<http%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23>%0D%0APREFIX+akt%3A++<http%3A%2F%2Fwww.aktors.org%2Fontology%2Fportal%23>%0D%0APREFIX+owl%3A++<http%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23>%0D%0APREFIX+akt%3A++<http%3A%2F%2Fwww.aktors.org%2Fontology%2Fportal%23>%0D%0APREFIX+akts%3A+<http%3A%2F%2Fwww.aktors.org%2Fontology%2Fsupport%23>%0D%0APREFIX+extn%3A+<http%3A%2F%2Fwww.aktors.org%2Fontology%2Fextension%23>%0D%0A%0D%0ASELECT+DISTINCT+%3Farticulo+%3Ftitulo+%3Fabstract+WHERE+{%0D%0A++%3Farticulo+rdf%3Atype+++akt%3AArticle-Reference%3B%0D%0A++++++++++++akt%3Ahas-title+%3Ftitulo.%0D%0A++++OPTIONAL+{%3Farticulo+extn%3Ahas-abstract+%3Fabstract}%0D%0A}LIMIT+100%0D%0A%0D%0A",
  method: "GET",
  headers:{
    "Content-Type":"application/json"
  },
}

var getArticlesDBLP={
  url: "http://dblp.rkbexplorer.com/sparql/?format=json&query=PREFIX+id%3A+++%3Chttp%3A%2F%2Fdblp.rkbexplorer.com%2Fid%2F%3E%0D%0APREFIX+rdf%3A++%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0D%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0APREFIX+akt%3A++%3Chttp%3A%2F%2Fwww.aktors.org%2Fontology%2Fportal%23%3E%0D%0APREFIX+owl%3A++%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%0D%0APREFIX+akt%3A++%3Chttp%3A%2F%2Fwww.aktors.org%2Fontology%2Fportal%23%3E%0D%0APREFIX+akts%3A+%3Chttp%3A%2F%2Fwww.aktors.org%2Fontology%2Fsupport%23%3E%0D%0APREFIX+extn%3A+%3Chttp%3A%2F%2Fwww.aktors.org%2Fontology%2Fextension%23%3E%0D%0A%0D%0ASELECT+DISTINCT+%3Farticulo+%3Ftitulo+%3Fabstract+WHERE+%7B%0D%0A++%3Farticulo+rdf%3Atype+++akt%3AArticle-Reference%3B%0D%0A++++++++++++akt%3Ahas-title+%3Ftitulo.%0D%0A++++OPTIONAL+%7B%3Farticulo+extn%3Ahas-abstract+%3Fabstract%7D%0D%0A%7DLIMIT+5000%0D%0A%0D%0A",
  method: "GET",
  headers:{
    "Content-Type":"application/json"
  }
}

/* request(options, callback) */ //importante para empezar con la indexacion


request(getArticlesIEEE, callback);

//setTimeout(() => {
  //request(getArticlesACM, callback);
//}, 30000);

//setTimeout(() => {
//request(getArticlesDBLP, callback);
//}, 120000);

















/*------------------------- Consultas SPARQL --------------------------- */

//Consulta IEEE con mas campos 

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
} 

----------------------- Consulta IEEE tan solo con titulo y abstract ----------------

SELECT DISTINCT ?titulo ?abstract WHERE {
  ?articulo rdf:type akt:Proceedings-Paper-Reference;
            akt:has-title ?titulo.
  OPTIONAL {?articulo extn:has-abstract ?abstract}
}

//Consulta SPARQL para extraer articulos de la ACM pero no tienen abstract

SELECT DISTINCT  ?titulo ?abstract WHERE {
  ?articulo rdf:type   akt:Article-Reference;
            akt:has-title ?titulo.
    OPTIONAL {?articulo extn:has-abstract ?abstract}
}LIMIT 700000

//Consulta SPARQL para extraer articulos de la DBLP
SELECT DISTINCT  ?titulo ?abstract WHERE {
  ?articulo rdf:type   akt:Article-Reference;
            akt:has-title ?titulo.
    OPTIONAL {?articulo extn:has-abstract ?abstract}
}LIMIT 500000


*/