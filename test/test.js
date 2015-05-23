'use strict';
/*jshint expr: true*/
var config = require('./config');
var expect = require('chai').expect;
var TypeForm = require('../');
var Form = require('../lib/models/form');
var StatementField = require('../lib/models/statementField');
var MultipleChoiceField = require('../lib/models/multipleChoiceField');

describe('typeform-sdk node module', function () {
  it('can create an empty API object', function () {
    var t = new TypeForm();
    expect(t).to.exist;

  });
  it('retrieves correct information from the api', function (done) {
    var t = new TypeForm(config.apiKey, config.proxy);
    t.info(function(res,err){
      if(err){
        console.error(err);
      }
      expect(res).to.exist;
      expect(res.name).to.be.equal('Typeform I/O Build API');
      done();
    });
  });
  it('can create a correct form with a statementField', function (done) {
    var t = new TypeForm(config);
    var form = new Form('MyForm', 21, 'http://example.com');
    form.fields.push(new StatementField('This is an awesome form!'));
    t.createForm(form, function(res,err){
      if(err){
        console.error(err);
      }
      expect(res).to.exist;
      expect(res.title).to.be.equal('MyForm');
      expect(res.design_id).to.be.equal(21);
      expect(res.fields[0].question).to.be.equal('This is an awesome form!');
      done();
    });
  });
  it('can create a correct form with a MultipleChoiceField', function (done) {
      var t = new TypeForm(config);
      var form = new Form('MyForm', 21, 'http://example.com');
      form.fields.push(new StatementField('This is an awesome form!'));
      form.fields.push(new MultipleChoiceField('Choose your weapon:', ['sword', 'staff', 'shield', 'keyblade']));
      t.createForm(form, function(res,err){
        if(err){
          console.error(err);
        }
        expect(res).to.exist;
        expect(res.title).to.be.equal('MyForm');
        expect(res.design_id).to.be.equal(21);
        expect(res.fields[0].question).to.be.equal('This is an awesome form!');
        expect(res.fields[1].question).to.be.equal('Choose your weapon:');
        done();
      });
    });
});
