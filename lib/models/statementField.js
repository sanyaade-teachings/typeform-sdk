'use strict';
var Field = require('./field');
var StatementField = function(question){
  Field.call(this, 'statement', question);
};

StatementField.prototype = Object.create(Field.prototype);

StatementField.prototype.constructor = StatementField;

module.exports = StatementField;
