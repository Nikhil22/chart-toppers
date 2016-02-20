var fun = require('../fun');
var fs = require('fs');

module.exports = function(app, dir) {

  app.get('', function(req, res) {
      //read data from file and send it as json
      //res.send(...)
  });

  app.post('/index', function(req, res) {
      //process request
      //write data to text file
      //res.sendFile(dir + '/public/views/index.html')
  });

}
