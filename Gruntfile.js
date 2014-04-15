/*global module, require*/
module.exports = function (grunt) {
    'use strict';
    require('matchdep').filterDev('*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),

		assemble : {
			options: {
				assets: 'docs/src/assets',
				flatten: true,
				partials: ['docs/src/partials/*.hbs'],
				layout: 'docs/src/layouts/default.hbs',
				data: ['docs/src/data/*.{json,yml}']
			},
			pages: {
				src: ['docs/src/templates/**/*.hbs'],
				dest: 'docs/dist/'
			}
		},
		sass: {
			dist: {
				files : {
					'dist/stylesheets/style.css': 'src/style.scss'
				}
			},
            docs: {
                files : {
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
                    'docs/dist/stylesheets/docs.css': 'docs/dist/stylesheets/docs.css'
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
						cwd: 'src/',
						src: ['**/*.js'],
						dest: 'dist/javascripts/'
					}
				]
			},
			docs: {
				files: [
					{
						expand: true,
						cwd: 'docs/src/assets/',
						src: ['images/*', 'javascripts/*'],
						dest: 'docs/dist/assets/'
					},
					{
						expand: true,
						cwd: 'dist/stylesheets/',
						src: ['*.css'],
						dest: 'docs/dist/assets/stylesheets/'
					},
                    {
                        expand: true,
                        cwd: 'dist/javascripts/',
                        src: ['*.js'],
                        dest: 'docs/dist/assets/javascripts/'
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
                tasks: ['sass:docs', 'myth:docs']
            },
			sass: {
				files: ['src/**/*.scss'],
				tasks: ['compile', 'copy:docs']
			},
            js: {
                files: ['src/**/*.js'],
                tasks: ['copy:dist', 'copy:docs']
            }
		}
	});

    grunt.registerTask('default', ['build']);

	grunt.registerTask('compile', ['sass:dist', 'myth:dist']);

	grunt.registerTask('dist', ['clean:dist', 'copy:dist', 'compile']);

	grunt.registerTask('build', ['dist', 'clean:docs', 'copy:docs', 'sass:docs', 'myth:docs', 'assemble']);

};
