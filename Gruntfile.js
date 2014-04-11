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
					'dist/ui/assets/style.css': 'dist/ui/assets/style.css'
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
					}
				]
			}
		},
		watch: {
			assemble: {
				files: ['docs/src/**/*'],
				tasks: ['assemble', 'copy']
			},
			sass: {
				files: ['assets/scss/**/*'],
				tasks: ['sass', 'copy']
			}
		}
	});

	grunt.registerTask('default', ['clean', 'sass:ui', 'myth', 'assemble', 'copy']);
};
