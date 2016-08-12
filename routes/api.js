const express = require('express'),
      router = express.Router(),
      myinstants = require('../lib/myinstants');

/* GET home page. */
router.get('/', function(req, res, next) {

  myinstants.list((err, body) => {

    res.json(body);
  });

});

router.get('/find', function(req, res, next) {

  var text = req.query && req.query.name ? req.query.name : "";

  myinstants.find(text, (err, body) => {

    res.json(body);
  });

});

router.post('/find', function(req, res, next) {

  var text = req.body && req.body.text ? req.body.text : "";

  myinstants.find(text, (err, body) => {

    res.json(body);
  });

});

// router.get('/random', function(req, res, next) {
//
//   myinstants.random((err, response) => {
//     // res.set("Content-Length", response.headers['content-length']);
//     // res.set("Content-Type",response.headers['content-type']);
//     // res.set(response.headers)
//     res.json(response);
//     // res.send(response.headers);
//     // res.write(res.body, 'binary');
//     // res.end();
//   });
//
// });

module.exports = router;
