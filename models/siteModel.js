var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var siteSchema = new Schema({

module.exports = mongoose.model('site', siteSchema);