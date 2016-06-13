var express = require('express');
var router = express.Router();
var siteController = require('../controllers/siteController.js');

/*
* GET
*/
router.get('/', function(req, res) {
  siteController.list(req, res);
});

/*
* GET
*/
router.get('/new/:url*', function(req, res, next) {
  var checkUrl = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  if (checkUrl.test(req.params.url)){
    res.json({message: "you entered invalid url"})
  }

  else {

    siteController.create(req, res);
  }
});

/*
* PUT
*/
router.put('/:id', function(req, res) {
  siteController.update(req, res);
});

/*
* DELETE
*/
router.delete('/:id', function(req, res) {
  siteController.remove(req, res);
});

module.exports = router;
