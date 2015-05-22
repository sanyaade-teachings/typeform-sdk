'use strict';
/*jshint expr: true*/
var expect = require('chai').expect;
var TypeForm = require('../');

describe('typeform-sdk node module', function () {
  it('must have at least one test', function () {
    var t = new TypeForm();
    expect(t).to.exist;
  });
  it('retrieves information from the api', function (done) {
    var t = new TypeForm('4398ded6beb95f4e8c57718dc8f9f26b', {proxy: {host:'172.27.185.200', port:80}});
    t.info(function(res,err){
      console.log('hei' + JSON.stringify(res));
      expect(res).to.exist;
      done();
    });
  });
});
