'use strict'

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    mochaTest: {
      options: {
        require: 'tests/test_helper.js'
      },
      src: ['tests/**/*_test.js']
    }
  });

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('default', ['test']);

};
