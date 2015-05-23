'use strict';
var https = require('https');
var HttpsProxyAgent = require('./HttpsProxyAgent');
//var utils = require('./utils');

var adapter = function(url, endpoint, proxy, auth){
  // If config object is passed, this lines parse it
  var endpointPrefix = '/v0.2';
  if(url.hasOwnProperty('endpoint')){
    endpoint = url.endpoint;
  }
  if(url.hasOwnProperty('proxy')){
    proxy = url.proxy;
  }
  // Default value for url
  url = url.baseUrl ? url.baseUrl : (url ? url : 'api.typeform.io');
  endpoint = endpointPrefix + endpoint;
  this.get = function(callback){
    if(proxy){
      var agent = new HttpsProxyAgent({
          proxyHost: proxy.host,
          proxyPort: proxy.port,
          hostname: url,
          port: 443,
          path: endpoint
      });
      https.request({
          hostname: url,
          port: 443,
          method: 'GET',
          path: endpoint,
          headers:{'X-API-TOKEN':auth},
          agent: agent
      }, function(res){
        res.on('data', function(data){
          try{
            var result = JSON.parse(data.toString());
            callback(result, null);
          }
          catch(e){
            callback(null, data.toString());
          }
        });
        res.on('error', function(e){
          callback(null, e);
        });
      }).end();
    }
    else{
      https.get({
        host: url,
        path: endpoint,
        headers:{'X-API-TOKEN':auth}
      }, function(res) {
        res.on('data', function(data){
          try{
            var result = JSON.parse(data.toString());
            callback(result, null);
          }
          catch(e){
            callback(null, data.toString());
          }
        });
        res.on('error', function(e){
          callback(null, e);
        });
      });
    }
  };

  this.send = function(data, callback){
    if(proxy){
      var req = https.request({
          host: proxy.host,
          port: proxy.port,
          method: 'POST',
          path: url + endpoint
      }, function(res){
        res.on('data', function(data){
          try{
            var result = JSON.parse(data.toString());
            if(result.hasOwnProperty('error')){
              callback(null, result.error);
            }
            else{
              callback(result, null);
            }
          }
          catch(e){
            callback(null, data.toString());
          }
        });
        res.on('error', function(e){
          callback(null, e);
        });
      });
      req.end();
    }
    else{
      var postRequest = https.request({
        host: url,
        path: endpoint,
        method:'POST',
        headers:{
          'X-API-TOKEN':auth,
          'Content-Type': 'application/json'
        }
      }, function(res) {
        if(res.statusCode >= 300){
          callback(null, 'Error: Status code ' + res.statusCode);
          return;
        }
        res.on('data', function(data){
          try{
            var result = JSON.parse(data.toString());
            if(result.hasOwnProperty('error')){
              callback(null, result.error);
            }
            else{
              callback(result, null);
            }
          }
          catch(e){
            callback(null, data.toString());
          }
        });
      });
      postRequest.write(data);
      postRequest.end();
    }
  };
};

module.exports = adapter;
