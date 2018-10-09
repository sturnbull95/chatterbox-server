/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var http = require('http');
var data = {results: []};
var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';
  if(request.url === '/classes/messages'){
    if(request.method === 'GET'){
      statusCode = 200;
    } else if(request.method === 'POST'){
      let body = '';
      statusCode = 201;
      request.on('data',chunk => {
        body += chunk.toString();
      }).on('end',() =>{
        body = JSON.parse(body);
        body.objectId = Math.floor(Math.random() * 9999);
        data.results.push(body);
      });
    }
  } else{
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end();
  }
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
module.exports.requestHandler = requestHandler;
