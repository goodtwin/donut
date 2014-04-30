/*global module, require*/
module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    assemble : {
      docs: {
        options: {
          assets: 'docs/assets',
          flatten: false,
          partials: ['docs/partials/*.hbs'],
          layout: 'docs/layouts/default.hbs',
          data: ['docs/data/*.{json,yml}']
        },
        files: [{
          expand: true,
          cwd: 'docs/templates/',
          src: ['**/*.hbs'],
          dest: 'dist/docs/'
        }]
      },
      mockups: {
        options: {
          assets: 'mockups/assets',
          flatten: false,
          partials: ['mockups/partials/*.hbs'],
          layout: 'mockups/layouts/default.hbs',
          data: ['mockups/data/*.{json,yml}']
        },
        files: [{
          expand: true,
          cwd: 'mockups/templates/',
          src: ['**/*.hbs'],
          dest: 'dist/mockups/'
        }]
      }
    },
    sass: {
      dist: {
        options: {
          sourceComments: 'map',
        },
        files : {
          'dist/style/stylesheets/style.css': 'style/style.scss'
        }
      },
      docs: {
        options: {
          sourceComments: 'map',
        },
        files : {
          'dist/docs/assets/stylesheets/docs.css': 'docs/assets/stylesheets/docs.scss'
        }
      }
    },
    myth: {
      options: {
        sourcemap: true
      },
      dist: {
        files: {
          'dist/style/stylesheets/style.css': 'dist/style/stylesheets/style.css'
        }
      },
      docs: {
        files: {
          'dist/docs/assets/stylesheets/docs.css': 'dist/docs/assets/stylesheets/docs.css'
        }
      }
    },
    clean: {
      dist: {
        files: [
        {
          dot: true,
          src: ['dist/*']
        }
        ]
      },
      docs: {
        files : [
        {
          dot: true,
          src: ['dist/docs/*']
        }
        ]
      }
    },
    copy: {
      dist: {
        files: [
        {
          expand: true,
          flatten: true,
          cwd: 'src/',
          src: ['**/*.js'],
          dest: 'dist/style/javascripts/'
        },
        {
          expand: true,
          cwd: 'src/assets',
          src: ['**/*'],
          dest: 'dist/style/assets/'
        }
        ]
      },
      docs: {
        files: [
        {
          expand: true,
          cwd: 'docs/assets/',
          src: ['images/*', 'javascripts/**/*.js'],
          dest: 'dist/docs/assets/'
        }
        ]
      },
      mockups: {
        files: [
        {
          expand: true,
          cwd: 'mockups/src/assets/',
          src: ['images/*', 'javascripts/**/*.js'],
          dest: 'dist/mockups/assets/'
        },
        {
          expand: true,
          cwd: 'dist/javascripts/',
          src: ['*.js'],
          dest: 'dist/mockups/assets/javascripts/src/'
        },
        {
          expand: true,
          cwd: 'dist/assets/',
          src: ['**/*'],
          dest: 'dist/mockups/assets/assets/'
        }
        ]
      }
    },
    watch: {
      hbs: {
        files: ['docs/**/*.hbs'],
        tasks: ['assemble:docs']
      },
      docs: {
        files: ['docs/src/assets/images/*', 'docs/src/assets/javascripts/*'],
        tasks: ['copy:docs']
      },
      mockups: {
        files: ['mockups/**/*.hbs'],
        tasks: ['assemble:mockups']
      },
      docsass: {
        files: ['docs/src/assets/stylesheets/*'],
        tasks: ['doccss']
      },
      sass: {
        files: ['src/**/*.scss', 'style/**/*.scss'],
        tasks: ['distcss', 'copy:docs', 'doccss']
      },
      js: {
        files: ['src/**/*.js'],
        tasks: ['copy:dist', 'copy:docs']
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'dist/style/stylesheets/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/style/stylesheets/',
        ext: '.min.css'
      }
    }
  });

require('load-grunt-tasks')(grunt);
grunt.loadNpmTasks('assemble');

grunt.registerTask('default', ['build']);
grunt.registerTask('distcss', ['sass:dist', 'myth:dist']);
grunt.registerTask('doccss', ['sass:docs', 'myth:docs']);
grunt.registerTask('dist', ['clean:dist', 'copy:dist', 'distcss', 'cssmin']);
grunt.registerTask('build', ['clean', 'dist', 'clean:docs', 'copy:docs', 'doccss', 'assemble']);

};
