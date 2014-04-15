/**
 *
 * @Author - Eugene Mutai
 * @Twitter - JheneKnights
 * @Email - eugenemutai@gmail.com
 *
 * Date: 06/04/14
 * Time: 8:12 PM
 * Description: The default grunt setup
 * Licensed under MIT (https://github.com/jheneknights/knightstart/blob/master/docs/LICENSE-MIT)
 */

// Being a frontend developer if 
// you haven’t yet added Grunt.js to your workflow, 
// then you are seriously missing something.

'use strict';

var LIVERELOAD_PORT = 35729;

// # Globbing Tut
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);
    // Equivalent to:
    // require('load-grunt-tasks')(grunt, {pattern: 'grunt-*'});
    // require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks); //using matchdep

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        app: {
            dist: "dist",
            dev: "app",
            test: "test",
            banner: "/*!\n *\n * @Author - Eugene Mutai\n * @Twitter - JheneKnights\n * @Email - eugenemutai@gmail.com\n *\n * Date: <%= grunt.template.today('dd/mm/yyyy') %>\n * Time: <%= grunt.template.today('hh:mm') %>\n * Description: <%= pkg.description %>\n * Licensed under <%= pkg.license.type %> ( <%= pkg.license.url %>)\n * Ayyee, Ayyee! Always happy to help. :) \n */\n"
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                // Using this:
                // http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
                files: [{
                    dot: true,
                    // dont delete the git folder
                    src: ['.tmp', 'test', '<%= app.dist %>', '!<%= app.dist %>/.git*']
                }]
            },
            test: ['.tmp', 'test']
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    // dot: true,
                    cwd: '<%= app.dev %>/',
                    dest: '<%= app.dist %>/',
                    src: ['{,*/}*.{ico,png,txt,htaccess,md}', 'images/*', 'fonts/*']
                }, {
                    expand: true,
                    cwd: 'frameworks/bootstrap/dist/',
                    dest: '<%= app.dist %>/',
                    src: ['fonts/*']
                }, {
                    expand: true,
                    // dot: true,
                    cwd: '.tmp/',
                    dest: '<%= app.dist %>/',
                    src: ['{,*/}*.{css,js}', 'js/*', 'css/*']
                }, {
                    expand: true,
                    // dot: true,
                    cwd: 'test/',
                    dest: '<%= app.dist %>/',
                    src: ['{,*/}*.{htm,html}', 'index.html']
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'app/',
                    dest: '<%= app.test %>/',
                    src: ['images/*', 'fonts/*']
                }, {
                    expand: true,
                    cwd: 'frameworks/bootstrap/dist/',
                    dest: '<%= app.test %>/',
                    src: ['fonts/*']
                }, {
                    expand: true,
                    // dot: true,
                    cwd: '.tmp/',
                    dest: '<%= app.test %>/',
                    src: ['{,*/}*.{css,js}', 'js/*', 'css/*']
                }]
            },
            others: {
                files: [{
                    expand: true,
                    dest: '<%= app.dist %>/',
                    src: ['.htaccess', 'docs/BSD-License', 'docs/LICENSE-MIT', 'README.md']
                }]
            },
        },

        // Reads the related html file
        // Then can manipulate it using DOM queries
        // Can also be used to extract all related files for concatination and minification
        dom_munger: {
            test: {
                options: {
                    read: [{
                        selector: 'link[rel="stylesheet"]',
                        attribute: 'href',
                        writeto: 'cssRefs',
                        isPath: true
                    }, {
                        selector: 'script[type="text/javascript"]',
                        attribute: 'src',
                        writeto: 'jsRefs',
                        isPath: true
                    }],
                    remove: ['link[rel="stylesheet"]', 'script[type="text/javascript"]'],
                    append: {
                        selector: 'head',
                        html: '<link href="css/app.full.css" rel="stylesheet">'
                    },
                    prepend: {
                        selector: 'application-engine',
                        html: '<script src="js/app.full.js"></script>'
                    }
                },
                src: 'index.html',
                dest: 'test/index.html' //update the dist/index.html (the src index.html is copied there)
            },
            dist: {
                options: {
                    remove: ['link[rel="stylesheet"]', 'script[type="text/javascript"]'],
                    append: {
                        selector: 'head',
                        html: '<link href="css/app.full.min.css" rel="stylesheet">'
                    },
                    prepend: {
                        selector: 'application-engine',
                        html: '<script src="js/app.full.min.js"></script>'
                    }
                },
                src: 'test/index.html', //read from source index.html
                dest: 'dist/index.html', //read from source index.
            }
        },

        // Concat is a pretty simple task that does exactly what you think it does.
        // concatenate files.
        concat: {
            // Join all the app's css, in this case bootstrap and your css
            options: {
                separator: '\n\n',
                stripBanners: true
            },
            appcss: {
                src: '<%= dom_munger.data.cssRefs %>',
                dest: '.tmp/css/app.full.css'
            },
            // for custom CSS files compilation
            // after customizing the individual css files in bootstrap
            bootstrap: {
                src: ['frameworks/bootstrap/test/*.css'],
                dest: 'app/css/bootstrap.css'
            },
            //Application's javascript dependencies in js/ folder
            appjs: {
                options: {
                    separator: ';',
                    banner: '<%= app.banner %>'
                },
                src: '<%= dom_munger.data.jsRefs %>',
                dest: '.tmp/js/app.full.js'
            }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // Minify the CSS concentanated -- application.css
        cssmin: {
            options: {
                banner: '<%= app.banner %>\n\n /* My minified css file */',
                keepSpecialComments: '1', // '*' or 1 or 0
                report: 'min' // 'gzip'
            },
            dist: {
                src: '.tmp/css/app.full.css', //'<%= dom_munger.data.cssRefs %>'
                dest: '.tmp/css/app.full.min.css'
            },
            bootstrap: {
                options: {
                    banner: false
                },
                src: 'app/css/bootstrap.css',
                dest: 'app/css/bootstrap.min.css'
            }
        },

        // Your CSS has now been combined into a single file and compressed. 
        // Lets compress your JavaScript code now by adding a new task called uglify.
        // Uglify does what cssmin does to css, only with javascript.
        uglify: {
            appjs: {
                options: {
                    report: "min", //"gzip",
                    // sourceMap: true,
                    // sourceMapURL: true,
                    preserveComments: "some" //"all"
                },
                files: [{
                    // expand: true,
                    src: '.tmp/js/app.full.js',
                    dest: ".tmp/js/app.full.min.js"
                }]
            }
        },

        // Compile bootstrap LESS files to CSS. -- /test folder
        // Use this if you are customizing the bootstrap css using less
        // https://www.npmjs.org/package/grunt-contrib-less
        less: {
            options: {
                report: 'min',
                sourceMap: false,
                // @path - Specifies directories to scan for @import directives when parsing.
                // Default value is the directory of the source, which is probably what you want
                paths: ['frameworks/bootstrap/less']
            },
            // compile Bootstrap
            files: {
                expand: true,
                cwd: 'frameworks/bootstrap/less/',
                src: '*.less',
                dest: 'frameworks/bootstrap/test',
                ext: '.css'
            }
        },

        // Add vendor prefixed styles to the CSS
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/css/',
                    src: '{,*/}*.css',
                    dest: '.tmp/css/'
                }]
            }
        },

        // minify HTML file
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.test %>',
                    src: ['{,*/}*.html'],
                    dest: '<%= app.dist %>',
                    // ext: '.min.html',
                    // extDot: 'last'
                }]
            }
        },

        // Compile Jade templates.
        // STOP WRITTING TIRESOME HTML, you do get tired opening and closing tags dont you?!
        // http://jade-lang.com
        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: {
                    // The path to compile to and the path to where to get the jade files
                    // In this case the in root
                    "index.html": ['app/index.jade']
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                // For pretty reports in the CLI :)
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            appjs: {
                src: 'app/{,*/}*.js'
            },
            afterconcat: ['Gruntfile.js', 'app/{,*/}*.js']
        },

        // The command should start server and the should open http://localhost:1500/ in your browser.
        // You can also try changing less / html file, the changes should be reflected on browser without refreshing the page.
        // livereload and starting a development server. 
        connect: {
            options: {
                port: 1515,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: ['<%= app.test %>']
                }
            },
            dist: {
                options: {
                    open: true,
                    port: 1500,
                    base: '<%= app.dist %>',
                    livereload: false
                }
            }
        },

        // grunt-open will open your browser at the project's URL
        // https://www.npmjs.org/package/grunt-open
        // open: {
        //     server: {
        //         path: 'http://localhost:1515/tellme/index.html'
        //     }
        // },

        // Wouldn't it be awesome if grunt did all of this automatically every time we changed a file?
        // Watch is a grunt plugin written to do just that.
        // Run predefined tasks whenever watched file patterns are added, changed or deleted.
        // Grouped the files to run specific tasks that are unique to each;
        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '{,*/}*.{htm,html}',
                    'test/{,*/}*.{js,css}',
                    'dist/{,*/}*.{js,css}',
                    'app/**/*.{png,jpg,jpeg,gif,webp,svg,ttf,otf,woff}'
                ]
            },
            css: {
                files: ["app/**/*.css"],
                tasks: ['dom_munger:test', 'concat:appcss', 'cssmin:dist', 'copy']
            },
            scripts: {
                files: ['app/{,*/}*.js', 'js/{,*/}*.js'],
                tasks: ['dom_munger:test', 'concat:appjs', 'jshint:appjs', 'uglify', 'copy']
            },
            jade: {
                files: ['**/*.jade'],
                tasks: ['jade', 'dom_munger:test', 'copy:dist', 'dom_munger:dist', 'htmlmin']
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['default']
            }
        }
    });


    // Triggred when watch task is prompted, this is for extra info that you may need
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.ok("--------- info: " + filepath + " has " + action + " || TASK: " + target + " ----------");
    });

    // grunt.registerTask('serve', ['express', 'open', 'watch:server']);

    // require('load-grunt-tasks')(grunt);
    // This replaces the tiresome task of including all grunt-plugins as you would have done below
    // These plugins provide necessary tasks. -- loading grunt plugins
    // EG.
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-contrib-jade');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-jade');
    // grunt.loadNpmTasks('grunt-contrib-nodeunit');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-watch');

    // Just split bootstrap into several css mini files
    // For the ones who would work with bootstrap CSS customisation instead of LESS
    grunt.registerTask('bootstrap', function(target) {
        if(target === 'less') {
            // Compile LESS and the concatinate the CSS into bootstrap.css
            return grunt.task.run(['less']);
        }else{
            // With no argument just run join all bootstrap individual files into one
            // Copies to "app/css" folder for later concatination with user's css
            return grunt.task.run(['concat:bootstrap']);
        }
    });

    // Serve the app and view changes live
    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['default', 'connect:dist:keepalive']);
        }
        grunt.task.run(['default', 'connect:livereload', 'watch']);
    });

    // Default task to run.
    grunt.registerTask('start', [
        'jshint:gruntfile',
        'clean', // clean all the files and folders [.tmp, dist and test]
        'jade', // IMPORTANT: Comment this if you are not using jade to write your html files 
        // 'concat:bootstrap', // -- wrap all bootstrap folders into one, done above instead
        'dom_munger:test', //get all required files to concat, cssmin and uglify
        'concat:appcss',
        'autoprefixer',
        'cssmin',
        'jshint:appjs',
        'concat:appjs',
        'uglify',
        'copy',
        'dom_munger:dist',
        'htmlmin'
    ]);

    // Tell Grunt what to do when we type "grunt" into the terminal
    // Could start watching for changes and running related tasks as per changes
    // Run "$ grunt watch" after the default tasks or "$ grunt server" to view your changes live
    grunt.registerTask('default', ['start']);

};