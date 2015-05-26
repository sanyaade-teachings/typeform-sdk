'use strict';
var Field = require('./field');
var MultipleChoiceField = function(question, choices, description){
  this.choices = choices ? choices : [];
  if(typeof this.choices === 'string'){
    if(this.choices.indexOf(',') > -1){
      this.choices = this.choices.split(',');
    }
    else if (this.choices.indexOf(';') > -1){
      this.choices = this.choices.split(';');
    }
    else if (this.choices.indexOf(':') > -1){
      this.choices = this.choices.split(':');
    }
    else if (this.choices.indexOf('.') > -1){
      this.choices = this.choices.split('.');
    }
    else if (this.choices.indexOf('|') > -1){
      this.choices = this.choices.split('|');
    }
    else{
      this.choices = {label: this.choices};
    }
  }
  else{
    for(var i = 0; i < this.choices.length; ++i){
      if(typeof this.choices[i] === 'string'){
        this.choices[i] = {label: this.choices[i]};
      }
    }
  }
  Field.call(this, 'multiple_choice', question, description);
};

MultipleChoiceField.prototype = Object.create(Field.prototype);

MultipleChoiceField.prototype.parse = function(){
  return {type: this.type, question: this.question, description: this.description, choices: this.choices};
};

MultipleChoiceField.prototype.addChoice = function(choice){
  choice = choice ? choice : '';
  this.choices.push({label: choice});
};

MultipleChoiceField.prototype.constructor = MultipleChoiceField;

module.exports = MultipleChoiceField;
