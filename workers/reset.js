// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

var path = require('path');
var urlMod = require('url');
var archive = require('../helpers/archive-helpers');
var http = require('http-request');
var _ = require('underscore');
var fs = require('fs');


fs.readFile(archive.paths.json, 'utf8', function (err, data) {
  urls = JSON.parse(data);

  _.each(urls, function (isArchived, url) {
    console.log(isArchived, url);
    if (isArchived) {
      fs.unlinkSync(archive.paths.archivedSites + '/' + url + '.html');
    }
  });

  fs.writeFile(archive.paths.json, JSON.stringify({}), 'utf8', function(err) {
    if (err) throw err;
  });

});








// save the response to file with a progress callback
