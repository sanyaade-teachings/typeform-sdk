'use strict';
var Field = function(type, question, description){
  this.question = question;
  this.description = description;
  this.type = (Field.types.indexOf(type) > -1) ? type : Field.types[0];
};

Field.prototype.parse = function(){
  return {type: this.type, question: this.question, description: this.description};
};
Field.types = ['not_yet_implemented', 'statement', 'picture_choice', 'multiple_choice', 'rating', 'opinion_scale'];
module.exports = Field;
