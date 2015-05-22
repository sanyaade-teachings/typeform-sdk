'use strict';
var Form = function(title, fields, design, callbackUrl){
  this.title = title ? title : 'My Form';
  this.fields = fields ? fields : [];
  this.design = design;
  this.callbackUrl = callbackUrl;
};

module.exports = Form;
