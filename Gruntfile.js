/*global module, require*/
module.exports = function (grunt) {
    'use strict';
    require('matchdep').filterDev('*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),

		assemble : {
			options: {
				assets: '/assets',
				flatten: true,
				partials: ['static/components/**/*.hbs'],
				layout: ['static/layouts/default.hbs'],
				data: ['static/data/*.{json,yml}']
			},
			pages: {
				src: ['static/docs/*.hbs'],
				dest: 'dist/ui/'
			}
		},
		sass: {
			ui: {
				options: {
					includePaths: ['assets/scss/bootstrap/lib/vendor/assets/stylesheets']
				},
				files : {
					'dist/ui/assets/style.css': 'assets/scss/init.scss'
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
		copy: {
			js : {
				files: [{
					expand: true,
					flatten: true,
					src: [
						'assets/lib/bootstrap/vendor/assets/javascripts/*.js',
						'assets/lib/donuthole/src/modules/**/*.js'
					],
					dest: 'dist/ui/assets/js/'
				}]
			}
		},
		clean: ['dist/ui/'],
		watch: {
			assemble: {
				files: ['static/**/*'],
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
