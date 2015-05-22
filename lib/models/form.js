'use strict';
var Form = function(title, design, callbackUrl, fields){
  this.title = title ? title : 'My Form';
  this.fields = fields ? fields : [];
  this.design = design;
  this.callbackUrl = callbackUrl;

  this.parse = function(){
    var result = {
      title: this.title,
      design_id: this.design,
      webhook_submit_url: this.callbackUrl,
      fields: []
    };
    for(var i = 0; i < this.fields.length; ++i){
      console.log(this.fields[i].parse());
      result.fields.push(this.fields[i].parse());
    }
    return JSON.stringify(result);
  };
};

module.exports = Form;
