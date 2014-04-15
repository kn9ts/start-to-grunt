/**
 *
 * @Author - Eugene Mutai
 * @Twitter - JheneKnights
 * @Email - eugenemutai@gmail.com
 *
 * Date: 06/04/14
 * Time: 8:12 PM
 * Description: The default grunt setup
 * Licensed under MIT (https://github.com/jheneknights/knightstart/blob/master/LICENSE-MIT)
 */

'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
});
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

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
            banner: "/**\n *\n * @Author - Eugene Mutai\n * @Twitter - JheneKnights\n * @Email - eugenemutai@gmail.com\n *\n * Date: <%= grunt.template.today('dd/mm/yyyy') %>\n * Time: <%= grunt.template.today('hh:mm') %>\n * Description:" + pkg.description + "\n * Licensed under" + pkg.license.type + "(" + pkg.license.url + ")\n * Ayyee, Ayyee! Always happy to help. :) \n */\n"
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                // Using this:
                // http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
                files: [{
                    dot: true,
                    // dont delete the git folder
                    src: ['.tmp/*', 'test', '<%= app.dist %>/*', '!<%= app.dist %>/.git*']
                }]
            },
            test: ['.tmp', 'test']
        },

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
                    append: [{
                        selector: 'head',
                        html: '<link href="css/app.full.css" rel="stylesheet">'
                    }, {
                        selector: 'body',
                        html: '<script src="js/app.full.js"></script>'
                    }]
                },
                src: 'index.html',
                dest: 'test/index.html' //update the dist/index.html (the src index.html is copied there)
            },
            dist: {
                options: {
                    remove: ['link', 'script'],
                    append: [{
                        selector: 'head',
                        html: '<link href="css/app.full.min.css" rel="stylesheet">'
                    }, {
                        selector: 'body',
                        html: '<script src="js/app.full.min.js"></script>'
                    }]
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
                seperator: '\n\n',
                stripBanners: true
            },
            test: {
                src: ['<%= dom_munger.data.jsRefs %>'],
                dest: ['.tmp/css/app.full.css']
            },
            // for custom CSS files compilation
            // after customizing the individual css files in bootstrap
            bootstrap: {
                src: ['frameworks/bootstrap/test/*.css'],
                dest: ['frameworks/bootstrap/test/bootstrap-mod.css']
            },
            //Application's javascript dependencies in js/ folder
            alljs: {
                options: {
                    seperator: ';'
                    stripBanners: true,
                    // Replace all 'use strict' statements in the code with a single one at the top
                    banner: "'use strict';\n\n <% app.banner %>",
                    process: function(src, filepath) {
                        return '// Source: ' + filepath + '\n' +
                            src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                    }
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
                banner: '<% app.banner % > \n/* My minified css file */',
                keepSpecialComments: '1', // '*' or 1 or 0
                report: 'min' // 'gzip'
            },
            dist: {
                src: '.tmp/css/app.full.css', //'<%= dom_munger.data.cssRefs %>'
                dest: 'dist/css/app.full.min.css'
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
            options: {
                report: "min", //"gzip",
                sourceMap: true,
                sourceMapURL: true,
                preserveComments: false, //"some", "all"
            },
            dist: {
                options: {
                    // expand: true,
                    banner: '<%= app.banner %>',
                    preserveComments: "some"
                },
                src: '.tmp/js/app.full.js',
                dest: "dist/js/app.full.min.js"
            },
            dependencies: {
                options: {
                    sourceMap: false,
                    sourceMapURL: false,
                },
                src: ['dist/js/dependencies.js'], //'<%= dom_munger.data.jsRefs %>'
                dest: ".tmp/js/dependencies.min.js"
            },
            example: {
                // Grunt will search for "**/*.js" under "lib/" when the "uglify" task
                // runs and build the appropriate src-dest file mappings then, so you
                // don't need to update the Gruntfile when files are added or removed.
                files: [{
                    expand: true, // Enable dynamic expansion.
                    cwd: 'app/', // Src matches are relative to this path.
                    src: ['**/*.js'], // Actual pattern(s) to match.
                    dest: '.tmp/js/', // Destination path prefix.
                    ext: '.min.js', // Dest filepaths will have this extension.
                    extDot: 'first' // Extensions in filenames begin after the first dot
                }],
            }
        },

        // Compile bootstrap LESS files to CSS. -- /test folder
        // Use this if you are customizing the bootstrap css using less
        // https://www.npmjs.org/package/grunt-contrib-less
        less: {
            options: {
                report: 'min',
                cleancss: true,
                sourceMap: false,
                // @path - Specifies directories to scan for @import directives when parsing.
                // Default value is the directory of the source, which is probably what you want
                paths: ['frameworks/bootstrap/less']
            }
            compileBootstrap: {
                files: [{
                    expand: true,
                    cwd: 'framework/bootstrap/',
                    src: ['less/*.less', '!less/bootstrap.less'],
                    dest: 'frameworks/bootstrap/test'
                }]
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
                    cwd: '<%= app.dist %>',
                    src: '{,*/}*.html',
                    dest: '.tmp'
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
                    "test/index.html": ['index.jade']
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
            afterconcat: ['Gruntfile.js', 'app/js/*.js']
        },

        connect: {
            options: {
                port: 1575,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [mountFolder(connect, 'app'), lrSnippet];
                    }
                }
            }
        },

        connect: {
            options: {
                port: 1500,
                livereload: LIVERELOAD_PORT,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: ['.tmp', '<%= app.dist %>']
                }
            },
            test: {
                options: {
                    port: 1515,
                    base: ['.tmp', 'test', '<%= app.dist %>']
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= config.dist %>',
                    livereload: false
                }
            }
        }

        // grunt-open will open your browser at the project's URL
        // https://www.npmjs.org/package/grunt-open
        open: {
            server: {
                path: 'http://localhost:1515/tellme/index.html'
            }
        },

        // Wouldn't it be awesome if grunt did all of this automatically every time we changed a file?
        // Watch is a grunt plugin written to do just that.
        // Run predefined tasks whenever watched file patterns are added, changed or deleted.
        // Grouped the files to run specific tasks that are unique to each;
        watch: {
            options: {
                nospawn: true
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '**/*.html',
                    'app/css/{,*/}*.css',
                    'app/js/{,*/}*.js',
                    'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    'app/fonts/{,*/}*.js',
                    'js/**/*.js'
                ]
            },
            css: {
                files: ["app/**/*.css", 'js/**/*.css'],
                tasks: ['concat:css', 'cssmin:css']
            },
            scripts: {
                files: ['<%= dom_munger.data.jsRefs %>'], //dont watch the libmp3lame.min.js
                tasks: ['concat:js', 'jshint', 'uglify']
            },
            jade: {
                files: ['**/*.jade'],
                tasks: ['jade', 'watch:scripts']
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['jshint', 'concat:js', 'jshint', 'uglify']
            }
        }
    });


    // Triggred when watch task is prompted, this is for extra info that you may need
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.ok("--------- info: " + target + ': ' + filepath + ' has ' + action + " ----------");
    });

    grunt.registerTask('serve', ['express', 'open', 'watch:server']);

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

    // Compile LESS and the concatinate the CSS into bootstrap.css
    grunt.registerTask('bootstrap', ['less', 'concat:bootstrap'])

    // Default task.
    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('default', ['jade', 'bootstrap',  'dom_munger:test', 'cssmin:css', 'concat:js', 'uglify', 'jshint', 'watch']);

};