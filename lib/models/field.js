'use strict';
var Field = function(type, question){
  this.question = question;
  this.type = (type in Field.types) ? type : Field.types[0];

  this.parse = function(){
    return {type: this.type, question: this.question}
  };
};
Field.types = ['not_yet_implemented', 'statement', 'picture_choice', 'multiple_choice', 'rating', 'opinion_scale'];
module.exports = Field;
