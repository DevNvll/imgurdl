var request = require('request');
var fs = require('fs');
var path = require('path');
var urlParse = require('url');

var config = {
  clientID: '3432f685f05e620'
};

function album(albumid, path) {
  var options = {
    headers: {
        'Authorization': 'Client-ID ' + config.clientID,
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    uri: 'https://api.imgur.com/3/album/' + albumid
  };
  function download(filesPath) {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var album = JSON.parse(body);
        var images = album.data.images;
        for (var i = 0; i < images.length; i++) {
          console.log('Downloading:', images[i].link);
          var imageName = urlParse.parse(images[i].link).pathname.slice(1);
          if (!fs.existsSync(albumid)){
              fs.mkdirSync(albumid);
          }
          request(images[i].link).pipe(fs.createWriteStream(filesPath ? filesPath + '/' + imageName : albumid + '/' + imageName));
        }
      }
      else {
        if(response.statusCode == 404) {
          console.log('Album not found! The ID is from an album?');
        } else {
          console.log(error);
        }
      }
    });
  }
  if(path === null) {
    download();
  }
  else {
    download(path);
  }
}

exports.album = album;
