'use strict';
//var Form = require('./models/form');
var adapter = require('./serviceAdapter');
var mockAdapter = require('./mockServiceAdapter');
module.exports = function (apiKey, proxy) {
  apiKey = apiKey ? apiKey : '';
  if(apiKey.hasOwnProperty('proxy')){
    proxy = apiKey.proxy;
  }
  if(apiKey.hasOwnProperty('apiKey')){
    apiKey = apiKey.apiKey;
  }
  this.url = 'api.typeform.io';
  this.apiKey = apiKey;

  this.info = function(cb, mock){
    var a;
    if(mock){
      a = new mockAdapter(this.url, '/', proxy, this.apiKey);
    }
    else{
      a = new adapter(this.url, '/', proxy, this.apiKey);
    }
    a.get(cb);
  };

  this.createForm = function(form, cb, mock){
    var a;
    if(mock){
      a = new mockAdapter(this.url, '/', proxy, this.apiKey);
    }
    else{
      a = new adapter(this.url, '/forms', proxy, this.apiKey);
    }
    a.send(form.parse(), cb);
  };
};
