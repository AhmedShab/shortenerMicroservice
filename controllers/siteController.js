var siteModel = require('../models/siteModel.js');

/**
* siteController.js
*
* @description :: Server-side logic for managing sites.
*/
module.exports = {

  /**
  * siteController.list()
  */
  list: function(req, res) {
    siteModel.find(function(err, sites){
      if(err) {
        return res.json(500, {
          message: 'Error getting site.'
        });
      }
      return res.json(sites);
    });
  },

  /**
  * siteController.show()
  */
  show: function(req, res) {
    var id = req.params.new;
    siteModel.findOne({_id: id}, function(err, site){
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
      return res.json(site);
    });
  },

  /**
  * siteController.create()
  */
  create: function(req, res) {
    var original_url = req.originalUrl.slice(11)
    var short_url = Math.floor(Math.random()*10001);

    console.log('-------------------------------------- ');

    siteModel.findOne({original_url: original_url}, function (err, site) {
      if(err) {
        return res.json(500, {
          message: 'Error saving site',
          error: err
        });
      }

      var newSite = new siteModel({
        original_url : original_url,
        short_url : short_url
      });

      newSite.save(function (errr, result) {
        if (err){
          return res.json({
            message: "couldn't save to the database"
          });
        }
      });

      return res.json({
        original_url: original_url,
        short_url: req.protocol + '://' + req.get('host') + '/' + short_url
      });

    });
  },

  redirect: function (req, res) {
    siteModel.findOne({short_url: req.params.url}, function (err, site) {
      if(err) {
        return res.json(500, {
          message: 'Error saving site',
          error: err
        });
      }
      if(!site) {
        return res.json(404, {
          message: 'No such site'
        });
      }
      res.redirect(site.original_url);
    });

  },

  /**
  * siteController.update()
  */
  update: function(req, res) {
    var id = req.params.id;
    siteModel.findOne({_id: id}, function(err, site){
      if(err) {
        return res.json(500, {
          message: 'Error saving site',
          error: err
        });
      }
      if(!site) {
        return res.json(404, {
          message: 'No such site'
        });
      }

      site.original_url =  req.body.original_url ? req.body.original_url : site.original_url;      site.short_url =  req.body.short_url ? req.body.short_url : site.short_url;
      site.save(function(err, site){
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
        return res.json(site);
      });
    });
  },

  /**
  * siteController.remove()
  */
  remove: function(req, res) {
    var id = req.params.id;
    siteModel.findByIdAndRemove(id, function(err, site){
      if(err) {
        return res.json(500, {
          message: 'Error getting site.'
        });
      }
      return res.json(site);
    });
  }

};
