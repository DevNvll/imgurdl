# ImgurDL
Node module to download Imgur albuns

##Installing

``$ npm install imgurdl``

``$ npm install imgurdl -g`` to install as a CLI application

##Usage

####Local
``var imgurdl = require('imgurdl');``

``imgurdl.setClientId('id')``

``imgurdl.download(albumID, path) //path is optional``

####CLI
``$ imgurdl albumId``
