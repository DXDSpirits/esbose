module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            bootstrap: {
                src: 'assets/stylesheets/bootstrap.scss',
                dest: 'assets/stylesheets/bootstrap.css'
            },
            fontawesome: {
                src: 'assets/stylesheets/font-awesome.scss',
                dest: 'assets/stylesheets/font-awesome.css'
            },
            amour: {
                src: 'assets/stylesheets/amour.scss',
                dest: 'assets/stylesheets/amour.css'
            },
            app: {
                src: ['assets/stylesheets/app.scss'],
                dest: 'assets/stylesheets/app.css'
            }
        },
        includes: {
            files: {
                src: ['html/*.html'],
                dest: '.',
                cwd: '.',
                flatten: true
            }
        },
        watch: {
            sass_bootstrap: {
                files: [
                    'assets/stylesheets/bootstrap/**/*.scss',
                    'assets/stylesheets/bootstrap.scss',
                    'assets/stylesheets/_variables.scss'
                ],
                tasks: ['sass:bootstrap']
            },
            sass_fontawesome: {
                files: [
                    'assets/stylesheets/font-awesome/**/*.scss',
                    'assets/stylesheets/font-awesome.scss',
                    'assets/stylesheets/_variables.scss'
                ],
                tasks: ['sass:fontawesome']
            },
            sass_amour: {
                files: ['assets/stylesheets/amour.scss'],
                tasks: ['sass:amour']
            },
            sass_app: {
                files: [
                    'assets/stylesheets/app/**/*.scss',
                    'assets/stylesheets/app.scss',
                    'assets/stylesheets/bootstrap/**/*.scss',
                    'assets/stylesheets/_variables.scss'
                ],
                tasks: ['sass:app']
            },
            html: {
                files: ['html/**/*.html'],
                tasks: ['includes']
            }
        },
        connect1: {
            server: {
                options: {
                    port: 7000,
                    hostname: '*'
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 7000,
                    base: '.',
                    keepalive: true,
                    hostname: '*'
                }
            }
        },
        concurrent: {
            dist: {
                tasks: ['sass', 'includes'],
                options: { logConcurrentOutput: true }
            },
            server: {
                tasks: ['watch', 'connect'],
                options: { logConcurrentOutput: true }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    
    // Configurable port number
    var port = grunt.option('port');
    if (port) grunt.config('connect.server.options.port', port);
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('server', 'concurrent:server');
    grunt.registerTask('dist', 'concurrent:dist');

};
