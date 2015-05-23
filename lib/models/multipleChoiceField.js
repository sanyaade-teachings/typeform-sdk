'use strict';
var Field = require('./field');
var MultipleChoiceField = function(question, choices){
  this.choices = choices ? choices : [];
  for(var i = 0; i < this.choices.length; ++i){
    if(typeof this.choices[i] === 'string'){
      this.choices[i] = {label: this.choices[i]};
    }
  }
  Field.call(this, 'multiple_choice', question);
};

MultipleChoiceField.prototype = Object.create(Field.prototype);

MultipleChoiceField.prototype.parse = function(){
  return {type: this.type, question: this.question, choices: this.choices};
};

MultipleChoiceField.prototype.addChoice = function(choice){
  choice = choice ? choice : '';
  this.choices.push({label: choice});
};

MultipleChoiceField.prototype.constructor = MultipleChoiceField;

module.exports = MultipleChoiceField;
