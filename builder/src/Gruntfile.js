module.exports = function(grunt) {
	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		env : {
			options : {
				/* Shared Options Hash */
				//globalOption : 'foo'
			},
			dev: {
				NODE_ENV : 'DEVELOPMENT'
			},
			prod : {
				NODE_ENV : 'PRODUCTION'
			}
		},
		watch: {
			files: [
				'src/**/*'
			],
			tasks: [ 'sass', 'concat', 'jshint', 'env:dev', 'autoprefixer', 'cssmin', 'uglify' , 'copy:maps' ]
		},
		sass: {	
			dev: {
				files: [
					{ src: "src/scss/theme.scss", dest: "build/_pre_sass/theme.css" },
					//{ src: "src/scss/centrals.scss", dest: "build/_pre_sass/front.styles.css" },
					//{ src: "src/scss/embeds.scss", dest: "build/_pre_sass/map.view.styles.css" },
				]
			},
		},
		copy:{
			maps: {
				files: [ // This can be drastically simplified by putting this stuff in a `src` folder.
					{ expand: true, src: ["build/_pre_sass/*.map"], dest: "", flatten: true, },
					//{ expand: true, src: ["build/_pre_sass/*.map"], dest: "dis/css/", flatten: true, },
				]
			}
		},
		concat: {
			front_styles: {
				src: [
					//'src/js/scrollbar/style/jquery.jscrollpane.css',
					//'src/js/scrollbar/style/jquery.jscrollpane.lozenge.css',
					//'src/css/colorbox.css',
					//'src/css/share_link.css',
					//'src/css/reactive.css',
					'build/_pre_sass/theme.css'
				],
				dest: 'build/css/theme.css',
			},
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' +
					'/*   */\n'
			},
			/*front_build: {
				src: 'build/js/maps.wsu.edu.js',
				dest: 'dis/js/maps.wsu.edu.js'
			},
			admin_build: {
				src: 'build/js/admin.maps.wsu.edu.js',
				dest: 'dis/js/admin.maps.wsu.edu.js'
			}*/
		},
		autoprefixer: {
			options: {
				browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie 8', 'ie 9','ie 10']
			},
			front_styles: {
				src: 'build/css/theme.css',
				dest: 'build/_precss/theme.css'
			},
		},
		cssmin: {
			options: {
				sourceMap: true,
			},
			combine: {
				files: {
					// Hmmm, in reverse order
					'theme.css': ['build/_precss/theme.css'],
				}
			}
		},
		jshint: {
			files: [
					//'src/js/zeroclipboard/ZeroClipboard.js',

				],
			options: {
				// options here to override JSHint defaults
				boss: true,
				curly: true,
				eqeqeq: true,
				eqnull: true,
				expr: true,
				immed: true,
				noarg: true,
				//onevar: true,
				//quotmark: "double",
				smarttabs: true,
				//trailing: true,
				undef: true,
				unused: true,
				globals: {
					jQuery: true,
					$: true,
					console: true,
					module: true,
					document: true,
					window:true,
					define:true,
					alert:true,
					setTimeout:true,
					ZeroClipboard:true,
					MutationObserver:true,
					google:true,
					tinyMCE:true,
					tinymce:true,
					addthis:true,
				}
			}
		},
		
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-sass');
	// Default task(s).
	grunt.registerTask('start', ['watch']);
	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('prod', ['env:prod', 'sass', 'concat', 'jshint', 'env:dev', 'autoprefixer', 'cssmin', 'uglify' , 'copy:maps' ]);

	grunt.registerTask('dev', [ 'env:dev', 'sass', 'concat', 'jshint', 'env:dev', 'autoprefixer', 'cssmin', 'uglify' , 'copy:maps'  ]);

};