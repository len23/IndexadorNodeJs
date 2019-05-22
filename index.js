var request = require('request');
 array = [ 
  {titulo:'asdsad',abstracto:'asd'}
 ]
 
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info.stargazers_count + " Stars");
    console.log(info.forks_count + " Forks");
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
    body:JSON.stringify(arrayArtículos)
}

request(options, callback)
