'use strict';

module.exports = function (grunt) {
  // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      check: [
        'Gruntfile.js',
        'scripts/**/*.js'
      ]
    },
    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          'dist/app.min.js': [
            'scripts/source-this.js',
            'scripts/that-source.js',
            'scripts/anotherSource.js'
          ]
        }
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      check: {
        // Alternately, set this to the .tmp location where sass compiles to css and
        // run before cssmin
        src: ['dist/screen.css']
      }
    },
    csscss: {
      options: {
        bundleExec: true,
        minMatch: 4,
        ignoreProperties: '-moz-appearance,-ms-appearance,-o-appearance,-webkit-appearance',
        ignoreSassMixins: false,
        colorize: true,
        shorthand: false,
        verbose: true
      },
      check: {
        src: ['dist/screen.css']
      }
    },
    cssmin: {
      dist: {
        files: {
          'dist/app.min.css': [
            'styles/source-this.css',
            'styles/that-source.css',
            'styles/anotherSource.css'
          ]
        }
      }
    }
  });

  // Define Tasks
  grunt.registerTask('default', [
    'cssmin:dist',
    'csslint:check',
    'csscss:check',
    'jshint:check',
    'uglify:dist'
    ]);
  });

  grunt.registerTask('check', [
    'csslint:check',
    'csscss:check',
    'jshint:check'
  ]);

  grunt.registerTask('dist', [
    'cssmin:dist',
    'uglify:dist'
  ]);
};
