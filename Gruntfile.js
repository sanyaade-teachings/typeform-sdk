'use strict';
module.exports = function (grunt) {
  // Show elapsed time at the end
  require('time-grunt')(grunt);
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-coffeelint');

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: ['Gruntfile.js']
      },
      js: {
        src: ['lib/*.js', 'lib/**/*.js']
      }
    },
    coffeelint: {
      options: {
        configFile: 'coffeelint.json',
        reporter: 'default'
      },
      test: ['test/**/*.coffee']
    },
    mochacli: {
      options: {
        reporter: 'nyan',
        bail: true,
        require: ['coffee-script/register']
      },
      all: ['test/*.coffee']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      js: {
        files: '<%= jshint.js.src %>',
        tasks: ['jshint:js', 'mochacli']
      },
      test: {
        files: '<%= coffeelint.test %>',
        tasks: ['coffeelint:test', 'mochacli']
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'coffeelint', 'mochacli']);
};
