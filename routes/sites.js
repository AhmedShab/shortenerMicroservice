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
router.get('/new/https://:url', function(req, res) {
    siteController.create(req, res);
});

// router.get('/:url', function(req, res) {
//     siteController.redirect(req, res);
// });

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
