/*global module, require*/
module.exports = function (grunt) {
  'use strict';
  require('matchdep').filterDev('*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    assemble : {
      options: {
        assets: 'docs/src/assets',
        flatten: false,
        partials: ['docs/src/partials/*.hbs'],
        layout: 'docs/src/layouts/default.hbs',
        data: ['docs/src/data/*.{json,yml}']
      },
      pages: {
        files: [{
          expand: true,
          cwd: 'docs/src/templates/',
          src: ['**/*.hbs'],
          dest: 'docs/dist/'
        }]
      }
    },
    sass: {
      dist: {
        options: {
          sourceComments: 'map',
        },
        files : {
          'dist/stylesheets/style.css': 'src/style.scss'
        }
      },
      docs: {
        options: {
          sourceComments: 'map',
        },
        files : {
          'docs/dist/assets/stylesheets/style.css': 'style/style.scss',
          'docs/dist/assets/stylesheets/docs.css': 'docs/src/assets/stylesheets/docs.scss'
        }
      }
    },
    myth: {
      options: {
        sourcemap: true
      },
      dist: {
        files: {
          'dist/stylesheets/style.css': 'dist/stylesheets/style.css'
        }
      },
      docs: {
        files: {
          'docs/dist/assets/stylesheets/docs.css': 'docs/dist/assets/stylesheets/docs.css',
          'docs/dist/assets/stylesheets/style.css': 'docs/dist/assets/stylesheets/style.css'
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
        files: [
        {
          dot: true,
          src: ['docs/dist/*']
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
          dest: 'dist/javascripts/'
        },
        {
          expand: true,
          cwd: 'src/assets',
          src: ['**/*'],
          dest: 'dist/assets/'
        }
        ]
      },
      docs: {
        files: [
        {
          expand: true,
          cwd: 'docs/src/assets/',
          src: ['images/*', 'javascripts/**/*.js'],
          dest: 'docs/dist/assets/'
        },
        {
          expand: true,
          cwd: 'dist/javascripts/',
          src: ['*.js'],
          dest: 'docs/dist/assets/javascripts/src/'
        },
        {
          expand: true,
          cwd: 'dist/assets/',
          src: ['**/*'],
          dest: 'docs/dist/assets/assets/'
        }
        ]
      }
    },
    watch: {
      hbs: {
        files: ['docs/src/**/*.hbs'],
        tasks: ['assemble']
      },
      docs: {
        files: ['docs/src/assets/images/*', 'docs/src/assets/javascripts/*'],
        tasks: ['copy:docs']
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
        cwd: 'dist/stylesheets/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/stylesheets/',
        ext: '.min.css'
      }
    }
  });

grunt.registerTask('default', ['build']);
grunt.registerTask('distcss', ['sass:dist', 'myth:dist']);
grunt.registerTask('doccss', ['sass:docs', 'myth:docs']);
grunt.registerTask('dist', ['clean:dist', 'copy:dist', 'distcss', 'cssmin']);
grunt.registerTask('build', ['dist', 'clean:docs', 'copy:docs', 'doccss', 'assemble']);

};
