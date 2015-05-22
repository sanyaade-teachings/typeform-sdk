var http = require('https');
var HttpsProxyAgent = require('./HttpsProxyAgent');

var adapter = function(url, endpoint, proxy, auth){
  // If config object is passed, this lines parse it
  if(url.hasOwnProperty('endpoint')){
    endpoint = url.endpoint;
  }
  if(url.hasOwnProperty('proxy')){
    proxy = url.proxy;
  }
  // Default value for url
  url = url.baseUrl ? url.baseUrl : (url ? url : 'api.typeform.io/v0.2');
  this.get = function(callback){
    //var fullPath = url + (endpoint ? endpoint : '/');
    // Http request, calling callback function as needed
    if(proxy){
      var agent = new HttpsProxyAgent({
          proxyHost: proxy.host,
          proxyPort: proxy.port,
          hostname: url,
          port: 443,
          path: endpoint
      });
      http.request({
          hostname: url,
          port: 443,
          method: 'GET',
          path: endpoint,
          headers:{'X-API-TOKEN':auth, 'content-length':10},
          agent: agent
      }, function(res){
        res.on('data', function(data){
          console.log('some data');
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
      http.get(fullPath, function(res) {
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

  this.send = function(token, solution, callback){
    var fullPath = url + (endpoint ? endpoint : '/forms');
    // Http request, calling callback function as needed
    if(proxy){
      var req = http.request({
          host: proxy.host,
          port: proxy.port,
          method: 'GET',
          path: fullPath
      }, function(res){
        res.on('data', function(data){
          try{
            var result = JSON.parse(data.toString());
            if(result.hasOwnProperty('error'))
              callback(null, result.error);
            else
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
      req.end();
    }
    else{
      https.get(url + endpoint + '/' + token + '/' + solution, function(res) {
        res.on('data', function(data){
          try{
            var result = JSON.parse(data.toString());
            if(result.hasOwnProperty('error'))
              callback(null, result.error);
            else
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
  }
}

module.exports = adapter;
