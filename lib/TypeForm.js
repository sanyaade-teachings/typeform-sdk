'use strict';
var Form = require('./models/form');
var adapter = require('./serviceAdapter');
module.exports = function (apiKey, config) {
  this.url = 'api.typeform.io/v0.2'
  this.apiKey = apiKey;

  this.info = function(cb){
    var done = false;
    var result;
    var a = new adapter(this.url, '/', config.proxy, this.apiKey);
    a.get(cb);
  };
};
