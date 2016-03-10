module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                sourceMap: true
            },
            build: {
                src: 'src/scrollManager.js',
                dest: 'build/scrollManager.min.js'
            }
        },

        watch: {
            js: {
                files: 'src/scrollManager.js',
                tasks: ['uglify']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('w', ['watch']);

};
