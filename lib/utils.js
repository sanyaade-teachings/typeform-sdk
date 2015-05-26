'use strict';
var StatementField = require('./models/statementField'),
    MultipleChoiceField = require('./models/multipleChoiceField'),
    PictureChoiceField = require('./models/pictureChoiceField'),
    Field = require('./models/field');

var parseWithType = function(field, parametersArray){
  var i, pField, mcField, type;
  if(parametersArray){
    type = field;
  }
  else{
    type = field.type;
  }
  if(field.question || parametersArray){
    switch(type){
      case 'statement':
        if(parametersArray){
          if(parametersArray.length > 1){
            return new StatementField(parametersArray[0], parametersArray[1]);
          }
          else{
            return new StatementField(parametersArray[0], undefined);
          }
        }
        else{
          return new StatementField(field.question, field.description);
        }
        break;
      case 'picture_choice':
        if(parametersArray){
          if(parametersArray.length > 1){
            var init = 1;
            if(parametersArray.length > 2){
              if(parametersArray[2] !== parseInt(parametersArray[2], 10)){
                init = 2;
                pField = new PictureChoiceField(parametersArray[0], parametersArray[1]);
              }
              else{
                pField = new PictureChoiceField(parametersArray[0], undefined);
              }
              for(i = init; i < parametersArray.length; i += 2){
                if(typeof parametersArray[i] === 'string'){
                  pField.addChoice(parametersArray[i], parametersArray[i+1]);
                }
                else{
                  pField.addChoice(parametersArray[i+1], parametersArray[i]);
                }
              }
            }
            else{
              pField=  new PictureChoiceField(parametersArray[0], parametersArray[1]);
            }
          }
          else{
            pField=  new PictureChoiceField(parametersArray[0], undefined);
          }
          return pField;
        }
        else{
          pField = new PictureChoiceField(field.question, field.description);
          var image, label;
          for(i = 0; i < field.choices.length; ++i){
            for(var value in field.choices[i]){
              if(typeof value === 'string' && !label){
                label = value;
              }
              else if(value === parseInt(value, 10)){
                image = value;
              }
            }
          }
          if(label !== undefined && image !== undefined){
            pField.addChoice(label, image);
          }
          return pField;
        }
        break;
      case 'multiple_choice':
        if(parametersArray){
          mcField=  new MultipleChoiceField(parametersArray[0]);
          if(parametersArray.length === 2){
            var choicesArray = [];
            if(parametersArray[1].indexOf(',') > -1){
              choicesArray = parametersArray[1].split(',');
            }
            else if (parametersArray[1].indexOf(';') > -1){
              choicesArray = parametersArray[1].split(';');
            }
            else if (parametersArray[1].indexOf(':') > -1){
              choicesArray = parametersArray[1].split(':');
            }
            else if (parametersArray[1].indexOf('.') > -1){
              choicesArray = parametersArray[1].split('.');
            }
            else if (parametersArray[1].indexOf('|') > -1){
              choicesArray = parametersArray[1].split('|');
            }
            else{
              mcField.addChoice(parametersArray[1]);
            }
            for(i = 0; i < choicesArray.length; i++){
              mcField.addChoice(choicesArray[i]);
            }
          }
          else{
            for(i = 1; i < parametersArray.length; i++){
              mcField.addChoice(parametersArray[i]);
            }
          }
          return mcField;
        }
        else{
          mcField = new MultipleChoiceField(field.question, [], field.description);
          if(typeof field.choices === 'string'){
            if(field.choices.indexOf(',') > -1){
              field.choices = field.choices.split(',');
            }
            else if (field.choices.indexOf(';') > -1){
              field.choices = field.choices.split(';');
            }
            else if (field.choices.indexOf(':') > -1){
              field.choices = field.choices.split(':');
            }
            else if (field.choices.indexOf('.') > -1){
              field.choices = field.choices.split('.');
            }
            else if (field.choices.indexOf('|') > -1){
              field.choices = field.choices.split('|');
            }
            else{
              field.choices = [field.choices];
            }
          }
          for(i = 0; i < field.choices.length; ++i){
            mcField.addChoice(field.choices[i]);
          }
          return mcField;
        }
        break;
      case 'rating':
      case 'opinion_scale':
        return new Field(field.question, field.description);
      default:
        return new Field(field.question, field.description);
    }
  }
  else{
    return {};
  }
};

var parseArray = function(field){
  for(var i = 0; i < field.length; i++){
    if(Field.types.indexOf(field[i]) > -1){
      var type = field[i];
      field.splice(i, 1);
      return parseWithType(type, field);
    }
  }
  return {};
};

var Utils = {
  parseField: function(field){
    var result = {};
    if(field instanceof Array){
      return parseArray(field);
    }
    if(field instanceof StatementField){
      return field;
    }
    else if(field instanceof MultipleChoiceField){
      return field;
    }
    else if(field instanceof PictureChoiceField){
      return field;
    }
    if(field.hasOwnProperty('type')){
      result = parseWithType(field);
    }
    else if(field.hasOwnProperty('question')){
      result.question = field.question;
      result.description = field.description;
      result.type = 'statement';
      if(field.choices){
        if(field.choices.length > 0 && field.choices[0].hasOwnProperty('picture') || field.choices[0].hasOwnProperty('image') || field.choices[0].hasOwnProperty('image_id')){
          result.type = 'picture_choice';
        }
        else{
          result.type = 'multiple_choice';
        }
      }
      result = parseWithType(result);
    }
    else if(typeof field === 'string'){
      result.question = field;
      result.type = 'statement';
      result = parseWithType(result);
    }

    return result;
  }
};

module.exports = Utils;
