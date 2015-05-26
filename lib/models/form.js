'use strict';
var Utils = require('../utils');
var Form = function(title, design, callbackUrl, fields, context){
  this.title = title ? title : 'My Form';
  this.fields = fields ? fields : [];
  this.design = design;
  this.callbackUrl = callbackUrl;
  this.api = context;

  this.createField = function(parameters){
    if(arguments.length > 1){
      parameters = Array.prototype.slice.call(arguments);
    }
    var field = Utils.parseField(parameters);
    if(Object.keys(field).length === 0){
      throw 'Error: Field could not be parsed.';
    }
    else{
      this.fields.push(field);
      return field;
    }
  };

  (function(fields, context){
    context.fields = [];
    for(var i = 0; i < fields.length; ++i){
      context.createField(fields[i]);
    }
  }(this.fields.slice(), this));

  this.parse = function(){
    var result = {
      title: this.title,
      design_id: this.design,
      webhook_submit_url: this.callbackUrl,
      fields: []
    };
    for(var i = 0; i < this.fields.length; ++i){
      result.fields.push(this.fields[i].parse());
    }
    return JSON.stringify(result);
  };

  this.send = function(callback){
    this.api.sendFormData(this.parse(), callback);
  };

};

module.exports = Form;
