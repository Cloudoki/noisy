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

  if (req.query && req.query.ssl_check) return res.status(200).send();

  var text = req.query && req.query.name ? req.query.name : "";

  myinstants.find(text, (err, body) => {

    res.json(body);
  });

});

router.post('/find', function(req, res, next) {

  var text = req.body && req.body.text ? req.body.text : "";

  // TODO: if (test.test(/^help$/i)) return

  // TODO: var token = req.body.token;

  // if (token !== process.env.NOISY_TOKEN) return res.status(403).send();

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
