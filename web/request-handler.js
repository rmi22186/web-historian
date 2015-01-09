var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var queryString = require('querystring');
var urlMod = require('url');
var fs = require('fs');
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
      var url = queryString.parse(data).url;
      archive.handleUrl(url, response);

      // response.end('ping!');
    });



  } else if (request.method === 'GET') {


    var url = urlMod.parse(request.url).pathname.slice(1);
    if (url === '') {
      url = 'index.html';
    }

    fs.readFile(archive.paths.siteAssets + '/' + url, 'utf8', function(err, data) {
      if (err) {
        //check in archive
        fs.readFile(archive.paths.archivedSites + '/' + url, 'utf8', function(err, data) {
          if (err) {
            httpHelpers.serve404(response);
          } else {
            httpHelpers.serveAssets(response, data);
          }
        });
      } else  {
        httpHelpers.serveAssets(response, data);
      }
    });

  } else if (request.method === 'OPTIONS') {
    httpHelpers.serveAssets(response, null);
  }
};

exports.initialize = function() {
  // archive.readListOfUrls();
}
