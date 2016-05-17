module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
               
        // Minifies javascripts
        uglify: {
            build: {
                src: 'vertical-resizer.js',
                dest: 'vertical-resizer.min.js'
            }
        },
        
        // Minifies css files
        cssmin: {
            css: {
                src: 'vertical-resizer.css',
                dest: 'vertical-resizer.min.css'
            }
        }
    });

    // Load Grunt plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-css');

    // Tell Grunt what to do when we type "grunt" in the terminal
    grunt.registerTask('default', ['uglify', 'cssmin']);

};