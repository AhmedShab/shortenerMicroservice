var express = require('express');
var router = express.Router();
var siteModel = require('../models/siteModel.js');

/* GET home page. */
router.get('/:short_url', function(req, res, next) {
  var short_url = req.params.short_url;
  siteModel.findOne({short_url: short_url}, function(err, site){
    if(err) {
      return res.json(500, {
        message: 'Error getting site.'
      });
    }
    if(!site) {
      return res.json(404, {
        message: 'No such site'
      });
    }
    res.redirect(site.original_url);
  });

});

router.get('https://little-url.herokuapp.com/:short_url', function(req, res, next){
  res.redirect('/:short_url');

});

module.exports = router;
