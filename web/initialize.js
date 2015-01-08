var fs = require('fs');
var archive = require('../helpers/archive-helpers.js');

// Sync is ok here because this is called just once on startup.
module.exports = function () {
  // if the archive folder doesn't exist, create it.
  if (!fs.existsSync(archive.paths.archive)) {
    // We use fs.mkdirSync to create the folder
    fs.mkdirSync(archive.paths.archive);
  }

  // if the file doesn't exist, create it.
  if (!fs.existsSync(archive.paths.json)) {
    fs.writeFileSync(archive.paths.json, JSON.stringify({}), 'utf8', function(err) {
      if (err) throw err;
    })
  }

  // if the folder doesn't exist, create it.
  if (!fs.existsSync(archive.paths.archivedSites)) {
    // We use fs.mkdirSync to create the folder
    fs.mkdirSync(archive.paths.archivedSites);
  }


};
