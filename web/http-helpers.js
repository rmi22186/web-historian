var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};


exports.serveAssets = function(response, asset) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  var statusCode = 200;
  response.writeHead(statusCode, headers);
  response.end(asset);
};

exports.serveFile = function(response, filepath) {
  fs.readFile(filepath, 'utf8', function(err, data) {
    exports.serveAssets(response, data);
  });
}

exports.serve404 = function(response) {
  response.writeHead(404, headers);
  response.end('go to hell, it\'s not here!');
}

exports.serveRedirect= function(response, url) {
  var redirectHeaders = headers;
  redirectHeaders['Location'] = url;
  response.writeHead(302, redirectHeaders);
  response.end();
}



// As you progress, keep thinking about what helper functions you can put here!
