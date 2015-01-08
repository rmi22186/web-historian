var fs = require('fs');
var path = require('path');
var _ = require('underscore');


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, './public'),
  'archivedSites' : path.join(__dirname, '../web/archives/sites'),
  'json' : path.join(__dirname, '../web/archives/sites.json'),
  'archive' : path.join(__dirname, '../web/archives'),
  'loading' : path.join(__dirname, '../web/public/loading.html'),
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!
(function() {
  // urls = {};

  exports.readListOfUrls = function(callback){
    fs.readFile(exports.paths.json, 'utf8', function (err, data) {
      // urls = JSON.parse(data);
      // if (err) throw err;
      callback(data);
    });
  };

  exports.handleUrl = function(url, response){
    fs.readFile(exports.paths.json, 'utf8', function (err, data) {
      console.log(exports.paths.json);
      urls = JSON.parse(data);
      if (err) throw err;

      if (urls[url] !== undefined) {
        if (urls[url]) {
          // TODO : SERVE
          response.end(exports.paths.archivedSites + '/' + url + '.html');
        } else {
          // TODO : redirect to loading
          response.end(exports.paths.loading);
        }
      } else {
        exports.addUrlToList(urls, url);
        response.end(exports.paths.loading);
      }
    });

  };

  exports.addUrlToList = function(urls, url){
    urls[url] = false;
    fs.writeFile(exports.paths.json, JSON.stringify(urls, null, 2), 'utf8', function(err) {
      if (err) throw err;
    })
    // TODO : redirect to loading
  };

  exports.isURLArchived = function(){
  };

  exports.downloadUrls = function(){
  };

})();
