'use strict';
/*jshint expr: true*/
var config + require('./config');
var expect = require('chai').expect;
var TypeForm = require('../');

describe('typeform-sdk node module', function () {
  it('must have at least one test', function () {
    var t = new TypeForm();
    expect(t).to.exist;
  });
  it('retrieves information from the api', function (done) {
    var t = new TypeForm(config.apiKey, config.proxy);
    t.info(function(res,err){
      console.log('hei' + JSON.stringify(res));
      expect(res).to.exist;
      done();
    });
  });
});
