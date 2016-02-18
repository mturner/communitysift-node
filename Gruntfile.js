(function() {
    'use strict';
    // this function is strict...
}());
module.exports = function(grunt) {

    console.log( "Running build in: " + __dirname )

    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        mochaTest: {
          test: {
            options: {
              reporter: 'spec',
              captureFile: 'results.txt', // Optionally capture the reporter output to a file 
              quiet: false, // Optionally suppress output to standard out (defaults to false) 
              clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false) 
            },
            src: ['test/**/*.js']
          }
        }

    });

    // build for local dev
    grunt.registerTask('default', 'mochaTest');

};
