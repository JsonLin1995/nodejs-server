var querystring = require("querystring")
    fs = require("fs");

function start(response, postData) {
    console.log("Request handler start is called.");
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload"'+ 
    'method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
    console.log("Request handler upload is called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    //抓出text的內容
    response.write("You've sent the text: "+
    querystring.parse(postData).text);
    response.end();
}

function show(response, postData) {
    //讀取server端圖檔的處理程序，為之後鋪路
    console.log("Request handler show is called.");
    fs.readFile("./tmp/test.jpg", "binary", function(error, file){
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/jpg"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;