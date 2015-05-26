'use strict';
var Form = require('./models/form'),
  adapter = require('./serviceAdapter'),
  mockAdapter = require('./mockServiceAdapter');
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

  this.newForm = function(title, design, callbackUrl, fields){
    return new Form(title, design, callbackUrl, fields, this);
  };

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

  this.sendForm = function(form, cb, mock){
    var a;
    if(mock){
      a = new mockAdapter(this.url, '/', proxy, this.apiKey);
    }
    else{
      a = new adapter(this.url, '/forms', proxy, this.apiKey);
    }
    a.send(form.parse(), cb);
  };

  this.sendFormData = function(form, cb){
    var a = new adapter(this.url, '/forms', proxy, this.apiKey);
    a.send(form, cb);
  };
};
