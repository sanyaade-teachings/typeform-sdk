'use strict';
var Field = require('./field');
var StatementField = function(question, description){
  Field.call(this, 'statement', question, description);
};

StatementField.prototype = Object.create(Field.prototype);

StatementField.prototype.constructor = StatementField;

module.exports = StatementField;
