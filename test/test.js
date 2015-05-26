'use strict';
/*jshint expr: true*/
var config = require('./config/config'),
    expect = require('chai').expect,
    TypeForm = require('../'),
    StatementField = TypeForm.StatementField,
    MultipleChoiceField = TypeForm.MultipleChoiceField;

describe('typeform-sdk node module', function () {
  describe('sanity checks', function(){

    it('can create an empty API object', function () {
      var t = new TypeForm();
      expect(t).to.exist;
    });

    it('can instantiate a form object', function () {
      var t = new TypeForm(config);
      var form = t.newForm('MyForm', 21, 'http://example.com');
      expect(form).to.exist;
    });

    it('can instantiate an statementField object', function () {
      var field = new StatementField('test', 'testing');
      expect(field).to.exist;
    });

    it('can instantiate an multipleChoiceField object', function () {
      var field = new MultipleChoiceField('test', [], 'testing');
      expect(field).to.exist;
    });

  });

  describe('forms with statement fields', function(){
    var t;
    before(function(){
      t = new TypeForm(config);
    });

    it('can create a correct form with two statementFields', function () {
      var form = t.newForm('MyForm', 21, 'http://example.com', [
        new StatementField('This is a statement field.', 'My statement field description.'),
        new StatementField('This is another statement field.', 'My other statement field description.')
      ]);
      expect(form.fields).to.not.be.empty;
      expect(form.fields[0]).to.be.instanceof(StatementField);
      expect(form.fields[0].question).to.be.equal('This is a statement field.');
      expect(form.fields[1]).to.be.instanceof(StatementField);
      expect(form.fields[1].question).to.be.equal('This is another statement field.');
    });

    it('can create a correct form with two statementFields with shorthand object notation', function () {
      var form = t.newForm('MyForm', 21, 'http://example.com', [
        {type: 'statement', question: 'This is a statement field.', description: 'My statement field description.'},
        {type: 'statement', question: 'This is another statement field.', description: 'My other statement field description.'}
      ]);
      expect(form.fields).to.not.be.empty;
      expect(form.fields[0]).to.be.instanceof(StatementField);
      expect(form.fields[0].question).to.be.equal('This is a statement field.');
      expect(form.fields[1]).to.be.instanceof(StatementField);
      expect(form.fields[1].question).to.be.equal('This is another statement field.');
    });

    it('can create a correct form with two statementFields with shorthand array notation', function () {
      var form = t.newForm('MyForm', 21, 'http://example.com', [
        ['statement', 'This is a statement field.', 'My statement field description.'],
        ['statement', 'This is another statement field.', 'My other statement field description.']
      ]);
      expect(form.fields).to.not.be.empty;
      expect(form.fields[0]).to.be.instanceof(StatementField);
      expect(form.fields[0].question).to.be.equal('This is a statement field.');
      expect(form.fields[1]).to.be.instanceof(StatementField);
      expect(form.fields[1].question).to.be.equal('This is another statement field.');
    });

    it('add a statementField to a form', function () {
      var form = t.newForm('MyForm', 21, 'http://example.com');
      var field = form.createField(new StatementField('statement', 'This is yet a third statement field.', 'My other other statement field description.'));
      expect(field).to.exist;
      expect(field).to.be.instanceof(StatementField);
      expect(form.fields).to.include(field);
    });

    it('add a statementField to a form with object notation', function () {
      var form = t.newForm('MyForm', 21, 'http://example.com');
      var field = form.createField({type: 'statement', question: 'This is yet a third statement field.', description: 'My other other statement field description.'});
      expect(field).to.exist;
      expect(field).to.be.instanceof(StatementField);
      expect(form.fields).to.include(field);
    });

    it('add a statementField to a form with array notation', function () {
      var form = t.newForm('MyForm', 21, 'http://example.com');
      var field = form.createField(['statement', 'This is yet a third statement field.', 'My other other statement field description.']);
      expect(field).to.exist;
      expect(field).to.be.instanceof(StatementField);
      expect(form.fields).to.include(field);
    });

    it('add a statementField to a form with shorthand notation', function () {
      var form = t.newForm('MyForm', 21, 'http://example.com');
      var field = form.createField('statement', 'This is yet a third statement field.', 'My other other statement field description.');
      expect(field).to.exist;
      expect(field).to.be.instanceof(StatementField);
      expect(form.fields).to.include(field);
    });
  });

  describe('forms with multiple choice fields', function(){
    var t;
    before(function(){
      t = new TypeForm(config);
    });

    it('can create a correct form with a multiple choice field', function () {
      var form = t.newForm('MyForm', 21, 'http://example.com', [
        new MultipleChoiceField('This is a multiple choice field.', ['first choice', 'second choice'], 'My multiple choice field description.')
      ]);
      expect(form.fields).to.not.be.empty;
      expect(form.fields[0]).to.be.instanceof(MultipleChoiceField);
      expect(form.fields[0].question).to.be.equal('This is a multiple choice field.');
      expect(form.fields[0].choices.length).to.be.equal(2);
    });

    it('can create a correct form with a multiple choice field and shorthand choices', function () {
      var form = t.newForm('MyForm', 21, 'http://example.com', [
        new MultipleChoiceField('This is a multiple choice field.', 'first choice,second choice', 'My multiple choice field description.')
      ]);
      expect(form.fields).to.not.be.empty;
      expect(form.fields[0]).to.be.instanceof(MultipleChoiceField);
      expect(form.fields[0].question).to.be.equal('This is a multiple choice field.');
      expect(form.fields[0].choices.length).to.be.equal(2);
    });

    it('can create a correct form with a multiple choice field with shorthand object notation', function () {
      var form = t.newForm('MyForm', 21, 'http://example.com', [
        {type: 'multiple_choice', question:'This is a multiple choice field.', choices: ['first choice', 'second choice'], description: 'My multiple choice field description.'}
      ]);
      expect(form.fields).to.not.be.empty;
      expect(form.fields[0]).to.be.instanceof(MultipleChoiceField);
      expect(form.fields[0].question).to.be.equal('This is a multiple choice field.');
      expect(form.fields[0].choices.length).to.be.equal(2);
    });

    it('can create a correct form with a multiple choice field with shorthand object notation and shorthand choices', function () {
      var form = t.newForm('MyForm', 21, 'http://example.com', [
        {type: 'multiple_choice', question:'This is a multiple choice field.', choices: 'first choice,second choice', description: 'My multiple choice field description.'}
      ]);
      expect(form.fields).to.not.be.empty;
      expect(form.fields[0]).to.be.instanceof(MultipleChoiceField);
      expect(form.fields[0].question).to.be.equal('This is a multiple choice field.');
      expect(form.fields[0].choices.length).to.be.equal(2);
    });

    it('can create a correct form with a multiple choice field with shorthand array notation', function () {
      var form = t.newForm('MyForm', 21, 'http://example.com', [
        ['multiple_choice', 'This is a multiple choice field.', 'first choice', 'second choice']
      ]);
      expect(form.fields).to.not.be.empty;
      expect(form.fields[0]).to.be.instanceof(MultipleChoiceField);
      expect(form.fields[0].question).to.be.equal('This is a multiple choice field.');
      expect(form.fields[0].choices.length).to.be.equal(2);
    });

    it('can create a correct form with a multiple choice field with shorthand array notation and shorthand choices', function () {
      var form = t.newForm('MyForm', 21, 'http://example.com', [
        ['multiple_choice', 'This is a multiple choice field.', 'first choice;second choice']
      ]);
      expect(form.fields).to.not.be.empty;
      expect(form.fields[0]).to.be.instanceof(MultipleChoiceField);
      expect(form.fields[0].question).to.be.equal('This is a multiple choice field.');
      expect(form.fields[0].choices.length).to.be.equal(2);
    });

    it('add a multipleChoiceField to a form', function () {
      var form = t.newForm('MyForm', 21, 'http://example.com');
      var field = form.createField(new MultipleChoiceField('This is a multiple choice field.', ['first choice', 'second choice'], 'My multiple choice field description.'));
      expect(field).to.exist;
      expect(field.choices.length).to.be.equal(2);
      expect(field).to.be.instanceof(MultipleChoiceField);
      expect(form.fields).to.include(field);
    });

    it('add a multipleChoiceField to a form with shorthand choices', function () {
      var form = t.newForm('MyForm', 21, 'http://example.com');
      var field = form.createField(new MultipleChoiceField('This is a multiple choice field.', 'first choice:second choice', 'My multiple choice field description.'));
      expect(field).to.exist;
      expect(field.choices.length).to.be.equal(2);
      expect(field).to.be.instanceof(MultipleChoiceField);
      expect(form.fields).to.include(field);
    });

    it('add a multipleChoiceField to a form with object notation', function () {
      var form = t.newForm('MyForm', 21, 'http://example.com');
      var field = form.createField({type: 'multiple_choice', question: 'This is a multiple choice field.', choices: ['first choice', 'second choice'], description: 'My multiple choice field description.'});
      expect(field).to.exist;
      expect(field.choices.length).to.be.equal(2);
      expect(field).to.be.instanceof(MultipleChoiceField);
      expect(form.fields).to.include(field);
    });

    it('add a multipleChoiceField to a form with object notation and shorthand choices', function () {
      var form = t.newForm('MyForm', 21, 'http://example.com');
      var field = form.createField({type: 'multiple_choice', question: 'This is a multiple choice field.', choices: 'first choice.second choice', description: 'My multiple choice field description.'});
      expect(field).to.exist;
      expect(field.choices.length).to.be.equal(2);
      expect(field).to.be.instanceof(MultipleChoiceField);
      expect(form.fields).to.include(field);
    });

    it('add a multipleChoiceField to a form with array notation', function () {
      var form = t.newForm('MyForm', 21, 'http://example.com');
      var field = form.createField(['multiple_choice', 'This is a multiple choice field.', 'first choice', 'second choice']);
      expect(field).to.exist;
      expect(field.choices.length).to.be.equal(2);
      expect(field).to.be.instanceof(MultipleChoiceField);
      expect(form.fields).to.include(field);
    });

    it('add a multipleChoiceField to a form with array notation and shorthand choices', function () {
      var form = t.newForm('MyForm', 21, 'http://example.com');
      var field = form.createField(['multiple_choice', 'This is a multiple choice field.', 'first choice:second choice']);
      expect(field).to.exist;
      expect(field.choices.length).to.be.equal(2);
      expect(field).to.be.instanceof(MultipleChoiceField);
      expect(form.fields).to.include(field);
    });

    it('add a multipleChoiceField to a form with shorthand notation', function () {
      var form = t.newForm('MyForm', 21, 'http://example.com');
      var field = form.createField('multiple_choice', 'This is a multiple choice field.', 'first choice','second choice');
      expect(field).to.exist;
      expect(field.choices.length).to.be.equal(2);
      expect(field).to.be.instanceof(MultipleChoiceField);
      expect(form.fields).to.include(field);
    });

    it('add a multipleChoiceField to a form with shorthand notation and shorthand choices', function () {
      var form = t.newForm('MyForm', 21, 'http://example.com');
      var field = form.createField('multiple_choice', 'This is a multiple choice field.', 'first choice|second choice');
      expect(field).to.exist;
      expect(field.choices.length).to.be.equal(2);
      expect(field).to.be.instanceof(MultipleChoiceField);
      expect(form.fields).to.include(field);
    });
  });
});
