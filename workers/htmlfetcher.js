// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

var path = require('path');
var urlMod = require('url');
var archive = require('../helpers/archive-helpers');
var http = require('http-request');
var _ = require('underscore');
var fs = require('fs');

archive.readListOfUrls(function (data) {
  var urls = JSON.parse(data);

  // if false (not archived), then scrape it, write it,  --- set url to true, and rewrite json, if necessary
  _.each(urls, function (isArchived, url) {
    if (!isArchived) {

      var downloadLocation = archive.paths.archivedSites + '/' + url + '.html';
      console.log(downloadLocation);
      http.get({
        url: url,
        progress: function (current, total) {
          console.log('downloaded %d bytes from %d', current, total);
        }
      }, downloadLocation, function (err, res) {
        if (err) {
          console.log(err);
          return;
        }
        else {
          urls[url] = true;

          fs.writeFile(archive.paths.json, JSON.stringify(urls, null, 2), 'utf8', function(err) {
            if (err) throw err;
          })
        }
      });


    }
  })

});


// save the response to file with a progress callback
