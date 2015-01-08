var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var queryString = require('querystring');
var urlMod = require('url');
// require more modules/folders here!

exports.handleRequest = function (request, response) {

  if (request.method === 'POST') {
    // look into archive for the request url
    // if that exists, serve them the site
    // if it does not exist, redirect to loading.html and write the url

    var data = "";

    request.on("data", function(chunk) {
        data += chunk;
    });

    request.on("end", function() {
      var headers = httpHelpers.headers;
      var statusCode = 200;
      response.writeHead(statusCode, headers);
      var url = queryString.parse(data).url;

      archive.handleUrl(url, response);

      // response.end('ping!');
    });



  } else if (request.method === 'GET') {
    response.writeHead(200, httpHelpers.headers);
    response.end();
  } else if (request.method === 'OPTIONS') {
    response.writeHead(200, httpHelpers.headers);
    response.end();
  }
};

exports.initialize = function() {
  // archive.readListOfUrls();
}
