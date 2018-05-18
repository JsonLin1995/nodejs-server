var http = require("http");
var url = require("url");

function start(route, handle) {
  http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var postData = "";
    console.log("Request for " + pathname + " received." );

    //接收post過來的資料
    
    request.setEncoding("utf8");
    //有data chunk進來
    request.addListener("data", function(postDataChunk){
      postData += postDataChunk;
      console.log("Received POST data chunk '"+
      postDataChunk + "'.");
    });
    //所有data chunk都接收完
    request.addListener("end", function(){
      route(handle, pathname, response, postData);
    });
    
  }).listen(8888);

  console.log("Server has started.");
}

exports.start = start;
