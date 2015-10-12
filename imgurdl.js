var request = require('request');
var fs = require('fs');
var path = require('path');
var urlParse = require('url');
var imgurdl = exports;

var clientID;

imgurdl.setClientId = function(id) {
  if(id && typeof id === 'string') {
    clientID = id;
  }
};

imgurdl.download = function(albumid, path) {

  var options = {
    headers: {
        'Authorization': 'Client-ID ' + clientID,
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    uri: 'https://api.imgur.com/3/album/' + albumid
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var album = JSON.parse(body);
      var images = album.data.images;
      for (var i = 0; i < images.length; i++) {
        var imageName = urlParse.parse(images[i].link).pathname.slice(1);
        if (!fs.existsSync(albumid)){
            fs.mkdirSync(albumid);
        }
        request(images[i].link)
        .pipe(fs.createWriteStream(path ? path + '/' + imageName : albumid + '/' + imageName));
      }
    }
    else {
      if(response.statusCode == 404) {
        console.log('Album not found! Is the ID from an album?');
      } else {
        console.log(error);
      }
    }
  });
};
