module.exports = function (grunt, data) {
    'use strict';

    var nodeEnv = data.env.NODE_ENV;
    var pkg = data.pkg;

    var config = {

        // -- flags

        flags: {
            tpl: false,
            css: false,
            docs: true,
        },

        // -- paths

        paths: {
            assets: 'assets',
            build: 'build',
            coverage: 'coverage',
            dist: 'dist',
            docs_dest: 'docs', // append to paths.build OR paths.dist
            src: 'src',
            tmp: 'tmp',
            vendor: 'vendor'
        },

        // -- files

        files: {

            // -- config

            // linted
            // watch: jshint, reload grunt config
            pkg: [
                'package.json',
                'bower.json'
            ],

            // beautified and linted
            // watch: jsbeautifier, jshint, reload grunt config
            grunt: [
                'Gruntfile.js',
                'grunt/**/*.js'
            ],

            // -- bundled vendors

            bundled_vendor_js: [
                '<%= paths.vendor %>/ng.cork.ui.*/dist/*.min.js',
            ],

            bundled_vendor_docs: [
                '<%= paths.vendor %>/ng.cork.ui.*/src/**/*.js',
                '!<%= paths.vendor %>/ng.cork.ui.*/src/**/*.spec.js',
                '<%= paths.vendor %>/ng.cork.ui.*/src/**/*.ngdoc',
            ],

            // -- source

            // javascript source
            // - beautified, linted and unit tested
            // - all copied to build/src
            // - loaded into browser by karma during unit tests
            // watch: jsbeautifier, jshint, build_js, build_test
            src_js: [
                // contrived expression to include only .js files because of karma pattern expressions
                '<%= paths.src %>/**/!(*spec|*.mock).js',
            ],

            // unit test specs
            // - beautified and linted
            // - loaded by karma unit tests
            // watch: jsbeautifier, jshint, build_js, build_test
            src_spec: [
                '<%= paths.src %>/**/*.spec.js'
            ],

            // sources for the html2js tasks
            // watch: templates (html2s) and test
            src_tpl: [
                '<%= paths.src %>/**/*.tpl.html'
            ],

            // sources for the less tasks
            // - copied to the build dir (sourcemaps, can be loaded in the browser)
            // watch: build_less
            src_less: [
                '<%= paths.src %>/**/*.less'
            ],

            // -- vendors

            // lib dependencies
            // - loaded by karma unit tests
            // watch: build_test, build_vendors
            vendor_js: [
                '<%= paths.vendor %>/angular/angular.js',
                '<%= paths.vendor %>/ng.cork.deep/dist/ng.cork.deep.min.js',
            ],

            // test only dependencies
            // - loaded by karma unit tests
            // watch: build_test
            vendor_test_js: [
                '<%= paths.vendor %>/angular-mocks/angular-mocks.js'
            ],

            // lib dependencies
            vendor_css: [],

            // -- tests

            // files to load in the browser, during tests
            karma_include: [
                '<%= files.vendor_js %>',
                '<%= files.vendor_test_js %>',
                '<%= files.src_spec %>',
                // see vars.karma_build.include and vars.karma_dist.include below
                // for files loaded only in those targets
            ],

            // contrived expression because pattern for karma preprocessors is a single minimatch
            karma_coverage: '<%= paths.src %>/**/!(*spec|*mock).js',

            // -- docs

            // watch: docs_build
            docs: [
                '<%= files.src_js %>',
                '<%= paths.src %>/**/*.ngdoc',
                '<%= files.bundled_vendor_docs %>',
                'docs/**/*.ngdoc'
            ],
        },

        // -- vars

        vars: {

            // -- meta

            // used in the banner below
            license: '<% if (pkg.licenses) { %><%= pkg.licenses[0].type %> <<%= pkg.licenses[0].url %>><% } %><% if (pkg.license) { %><%= pkg.license %><% }%>',

            // banner included at the top of dist files
            banner: '/**\n' +
                ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' *\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> <<%= pkg.author.url %>>\n' +
                ' * License: <%= vars.license %>\n' +
                ' */\n',

            // used in the name of the template module (results in "my.module.templates")
            // as well as filenames of dist files
            ngNamespace: 'ng.cork.ui',

            // -- docs related

            docs: {

                // comment out if you don't wan't a logo and a link
                image: 'docs/assets/logo.png',
                imageLink: '#/guide',

                // scripts and stylesheets to load in the documentation app
                // the below docs.css overrides the color scheme and navbar with some Cork Labs branding
                scripts: [],
                styles: [
                    'docs/assets/docs.css'
                ],

                // this is prepended to example dependencies when loading them on the iframes
                // in order for the "Edit in Plunkr" feature to work, the baseUrl needs to be a publicly available URL
                examplesBaseUrl: '../../',

                // scripts stylesheets and examples
                examplesScripts: [
                    'vendor/angular/angular.js'
                ],
                examplesStyles: [
                    '//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.css',

                ],

                // the version selector expects JSON with the existing version and their URLs
                // [{"version":"0.0.3","url":"http://jarvis.cork-labs.org/nglib-boilerplate/0.0.3"},{"version":"0.0.2","url":"http://jarvis.cork-labs.org/nglib-boilerplate/0.0.2"}]
                // uncomment to enable the version selector
                //versionsEndpoint: '//jarvis.cork-labs.local.org/api/project/<%= pkg.name %>/versions',

                // which section (or page) to open by default
                startPage: 'guide',

                // sections to generate
                sections: {
                    guide: {
                        src: ['docs/contents/guide/*.ngdoc'],
                        title: 'Guide',
                        icon: 'book',
                        priority: 1
                    },
                    demos: {
                        src: ['docs/contents/demos/*.ngdoc'],
                        title: 'Demos',
                        icon: 'eye-open',
                        priority: 2
                    },
                    api: {
                        src: ['<%= files.bundled_vendor_docs %>', 'src/**/*.js', '!src/**/*.spec.js', 'src/**/*.ngdoc', 'docs/contents/api/*.ngdoc'],
                        title: 'API',
                        icon: 'puzzle-piece',
                        priority: 3
                    }
                },
                // uncomment to enable Google Analytics
                // analytics: {
                //     account: 'UA-08150815-0',
                //     domainName: 'my-domain.com'
                // },
            },

            // -- build related

            // template modules to generate
            // by default, generates a single one "main" out of ALL the tpl files
            build_templates: {
                main: {
                    src: '<%= files.src_tpl %>',
                    dest: '<%= paths.build %>/src/lib/<%= vars.ngNamespace %>/<%= vars.ngNamespace %>.templates.js',
                    name: '<%= vars.ngNamespace %>.templates'
                }
            },

            // less entry points
            // by default, only one target, with entry point "main.less"
            build_less: {
                main: {
                    src: '<%= paths.src %>/less/<%= vars.ngNamespace %>.less',
                    dest: '<%= paths.build %>/src/lib/<%= vars.ngNamespace %>/<%= vars.ngNamespace %>.css'
                }
            },

            // extra options for tests executed during build
            build_test: {
                browsers: [
                    'PhantomJS'
                    // 'Chrome',
                    // 'ChromeCanary',
                    // 'Firefox',
                    // 'Opera',
                    // 'Safari',
                ],
                // files to load in the browser, during karma:build tests
                include: [
                    '<%= files.src_js %>',
                    '<%= files.bundled_vendor_js %>'
                    // the template modules (html2js.*.destinations) are appended in grunt/config/build.js
                ],
            },

            // -- dist related

            // template modules to generate
            // by default, generates a single one "main" out of ALL the tpl files
            // generated into tmp/ dir and then concat during "dist_js"
            dist_templates: {
                main: {
                    src: '<%= files.src_tpl %>',
                    dest: '<%= paths.tmp %>/<%= vars.ngNamespace %>/<%= vars.ngNamespace %>.templates.js',
                    name: '<%= vars.ngNamespace %>.templates'
                }
            },

            // css distribution files
            dist_css: {
                main: {
                    src: [
                        '<%= paths.src %>/less/<%= vars.ngNamespace %>.less',
                        '<%= paths.src %>/sass/<%= vars.ngNamespace %>.sass',
                        '<%= paths.src %>/css/**/*.css'
                    ],
                    dest: '<%= paths.dist %>/<%= pkg.name %>'
                }
            },

            // javascript distribution files
            dist_js: {
                main: {
                    src: [
                        '<%= vars.dist_templates.main.dest %>',
                        '<%= files.src_js %>',
                        '<%= files.bundled_vendor_js %>'
                    ],
                    dest: '<%= paths.dist %>/<%= pkg.name %>'
                },
                lib: {
                    src: [
                        '<%= files.src_js %>',
                        '<%= files.bundled_vendor_js %>'
                    ],
                    dest: '<%= paths.dist %>/lib/',
                    expand: false,
                    flatten: true,
                    options: {
                        concat: false,
                        output: 'both',
                    }
                }
            },

            // tests executed during dist
            dist_test: {
                browsers: [
                    'PhantomJS'
                    // 'Chrome',
                    // 'ChromeCanary',
                    // 'Firefox',
                    // 'Opera',
                    // 'Safari',
                ],
                // files to load in the browser, during karma:dist tests
                include: [
                    '<%= paths.dist %>/**/*.min.js'
                ],
            }
        }
    };

    return config;
};
