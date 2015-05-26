'use strict';
var Field = require('./field');
var PictureChoiceField = function(question, choices, description){
  this.choices = choices ? choices : [];
  Field.call(this, 'statement', question, description);
};

PictureChoiceField.prototype = Object.create(Field.prototype);

PictureChoiceField.prototype.constructor = PictureChoiceField;

PictureChoiceField.parse = function(){
  return {type: this.type, question: this.question, description: this.description, choices: this.choices};
};

PictureChoiceField.addChoice = function(choice, picture){
  choice = choice ? choice : '';
  if(choice.hasOwnProperty('picture')){
    picture = choice.picture;
  }
  if(choice.hasOwnProperty('label')){
    choice = choice.label;
  }
  // TODO change the call to work with urls instead of image_id
  this.choices.push({label: choice, image_id: picture});
};

module.exports = PictureChoiceField;
