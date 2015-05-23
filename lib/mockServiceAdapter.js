'use strict';
var adapter = function(url, endpoint, proxy, auth){
  var endpointPrefix = '/v0.2';
  if(url.hasOwnProperty('endpoint')){
    endpoint = url.endpoint;
  }
  if(url.hasOwnProperty('proxy')){
    proxy = url.proxy;
  }
  url = url.baseUrl ? url.baseUrl : (url ? url : 'api.typeform.io');
  endpoint = endpointPrefix + endpoint;
  this.get = function(callback){
    console.log(auth);
    if(proxy){

      callback();
    }
    else{
      callback();
    }
  };

  this.send = function(data, callback){
    console.log(auth);
    if(proxy){
      callback();
    }
    else{
      callback();
    }
  };
};

module.exports = adapter;
