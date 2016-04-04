module.exports = function(grunt) {
	grunt.initConfig({

		project: {
			src: 'dev',
			build: 'build',
			css: {
				src: 'dev/pcss/main.pcss',
				build: 'build/main.css',
				dir: 'dev/pcss/'
			},
			js: {
				src: 'dev/js',
				build: 'build/js'
			},
			img: {
				src: 'dev/img',
				build: 'build/img',
				allExtensions: '**/*.{png,jpg,gif,svg}',
				svgSprite: {
					src: 'svg-sprite/*.svg',
					build: 'build/img/sprite.svg'
				}
			}
		},
		pkg: grunt.file.readJSON('package.json'),

		postcss: {
			options: {
				map: false,
				processors: [
					require('postcss-import')(),
					require('postcss-mixins')(),
					require('postcss-nested')(),
					require('postcss-simple-vars')(),
					require('postcss-property-lookup')(),
					require('postcss-assets')({
						basePath: 'dev'
					}),
					require('postcss-inline-svg')({
						path: 'dev'
					}),
					require('postcss-calc')(),
					require('postcss-hexrgba')(),
					require('postcss-custom-media')(),
					require('postcss-media-minmax')(),
					require('lost')(),
					require('autoprefixer')({
						browsers: ['last 2 versions', '> 1%', 'Android >= 4', 'iOS >= 8']
					})
				]
			},
			default: {
				src: '<%= project.css.src %>',
				dest: '<%= project.css.build %>'
			},
			minify: {
				options: {
					map: false,
					processors: [
						require('cssnano')({
							autoprefixer: false,
							calc: false,
							colormin: true,
							convertValues: false,
							discardComments: true,
							discardDuplicates: true,
							discardEmpty: true,
							discardUnused: true,
							mergeIdents: true,
							mergeLonghand: true,
							mergeRules: false,
							minifyFontValues: true,
							minifyGradients: true,
							minifySelectors: true,
							normalizeCharset: true,
							normalizeUrl: false,
							orderedValues: false,
							reduceIdents: true,
							uniqueSelectors: true,
							zindex: true
						})
					]
				},
				src: '<%= project.css.build %>'
			}
		},

		usebanner: {
			default: {
				options: {
					position: 'top',
					banner: '/*\n' +
							'Author:     Aleks Hudochenkov (hudochenkov.com)\n' +
							'Version:    <%= grunt.template.today("dd.mm.yyyy") %>\n' +
							'-----------------------------------------------------------------------------*/\n'
				},
				files: {
					src: ['<%= project.css.build %>']
				}
			}
		},

		clean: {
			build: [
				'<%= project.build %>'
			],
			options: {
				force: true
			}
		},

		copy: {
			images: {
				files: [
					{
						expand: true,
						cwd: '<%= project.img.src %>',
						src: ['<%= project.img.allExtensions %>', '!<%= project.img.svgSprite.src %>'],
						dest: '<%= project.img.build %>'
					}
				]
			},
			html: {
				files: [
					{
						expand: true,
						cwd: '<%= project.src %>',
						src: ['*.html'],
						dest: '<%= project.build %>'
					}
				]
			},
			js: {
				files: [
					{
						expand: true,
						cwd: '<%= project.js.src %>',
						src: ['*.js'],
						dest: '<%= project.js.build %>'
					}
				]
			},
			other: {
				files: [
					{
						expand: true,
						cwd: '<%= project.src %>',
						src: ['CNAME', 'favicon.ico'],
						dest: '<%= project.build %>'
					}
				]
			}
		},

		concat: {
			options: {
				separator: '\n'
			},
			jslibs: {
				src: [
					'node_modules/jquery/dist/jquery.min.js',
					'node_modules/bxslider/dist/jquery.bxslider.min.js',
					'<%= project.js.src %>/libs/*.js',
				],
				dest: '<%= project.js.build %>/libs.js'
			}
		},

		jscs: {
			default: {
				src: ['<%= project.js.src %>/scripts.js', 'Gruntfile.js']
			}
		},

		'gh-pages': {
			options: {
				base: 'build'
			},
			src: '**/*'
		},

		svgstore: {
			options: {
				prefix: 'icon-',
				svg: {
					style: 'position: absolute; width: 0; height: 0; visibility: hidden;'
				}
			},
			dev: {
				files: {
					'<%= project.img.svgSprite.build %>': ['<%= project.img.src %>/<%= project.img.svgSprite.src %>']
				},
				options: {
					formatting: {
						indent_char: '	',
						indent_size: 1
					},
					includedemo: '<!doctype html><html><head><style>body{background: #eee;}svg{width:50px; height:50px; fill:black;}</style><head><body>\n{{{svg}}}\n\n{{#each icons}}<svg class="svg-icon"><use xlink:href="#{{name}}" /></svg>\n{{/each}}\n\n</body></html>\n'
				}
			},
			build: {
				files: {
					'<%= project.img.svgSprite.build %>': ['<%= project.img.src %>/<%= project.img.svgSprite.src %>']
				}
			}
		},

		browserSync: {
			bsFiles: {
				src: [
					'<%= project.build %>/*.html',
					'<%= project.js.build %>/*.js',
					'<%= project.img.build %>/**/*.{png,jpg,gif,svg}',
				]
			},
			options: {
				server: {
					baseDir: '<%= project.build %>'
				},
				watchTask: true,
				notify: false,
				online: false,
				ghostMode: false
			}
		},

		bsReload: {
			css: {
				reload: '<%= project.css.build %>'
			},
			all: {
				reload: true
			}
		},

		watch: {
			options: {
				spawn: false
			},
			pcss: {
				files: ['<%= project.css.dir %>/*.pcss'],
				tasks: ['postcss:default', 'bsReload:css'],
			},
			img: {
				files: ['<%= project.img.src %>/<%= project.img.allExtensions %>', '!<%= project.img.src %>/<%= project.img.svgSprite.src %>'],
				tasks: ['newer:copy:images', 'bsReload:all']
			},
			svgSprite: {
				files: ['<%= project.img.src %>/<%= project.img.svgSprite.src %>'],
				tasks: ['svgstore:dev', 'bsReload:all']
			},
			jslibs: {
				files: ['<%= project.js.src %>/libs/*.js'],
				tasks: ['concat:jslibs']
			},
			js: {
				files: ['<%= project.js.src %>/*.js'],
				tasks: ['copy:js']
			},
			html: {
				files: ['<%= project.src %>/*.html'],
				tasks: ['newer:copy:html']
			},
		}

	});

	require('jit-grunt')(grunt, {
		usebanner: 'grunt-banner'
	});

	grunt.registerTask('default', ['newer:copy', 'svgstore:dev', 'concat:jslibs', 'postcss:default', 'browserSync', 'watch']);
	grunt.registerTask('test', ['jscs']);
	grunt.registerTask('build', ['clean', 'copy', 'svgstore:build', 'concat:jslibs', 'postcss:default', 'postcss:minify', 'usebanner']);

	grunt.registerTask('deploy', ['build', 'gh-pages']);
};