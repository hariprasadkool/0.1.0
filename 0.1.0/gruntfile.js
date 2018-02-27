var grunt = require('grunt');


// #1 Writing Your First Grunt Task
grunt.registerTask('world', 'default task description', function(){
    console.log('hello world');
});

// #2.1 Provide a variable or name to  Grunt Task
grunt.registerTask('hello', 'say hello', function(name){
    if(!name || !name.length)
      grunt.warn('you need to provide a name.');
    console.log('hello ' + name);
});

// #2.2 chain multiple grunt tasks by using an array
grunt.registerTask('default', ['world', 'hello:hp']);


/* ================================================================================== */

// #3.1 Grunt config
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    read: grunt.file.read('./src/index.html'),
    copy: grunt.file.copy('./src/index.html','./dist'),
    delete: grunt.file.delete('./dist'),
    print: {
        name: ['hari', 'prasad', 'kool'],
        mobile: 1234567890
    }
  });

// #3.2 Grunt tasks
grunt.registerMultiTask('print', function() {
    grunt.log.writeln(this.target + '= ' + this.data);
    //grunt.log.error("Error msg will be shown here");
});

/* ================================================================================== */






/* ================================================================================== */

 // #4.1 Configuration goes here 
 grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Move other files to production folder
    copy: {
      target: {
        files: {
          'src/': [ 'src/*.html', 
                    'src/styles/**', 
                    'src/images/**', 
                    'src/js/**.js'
                  ]
        }
      }
    },

    // Lint the javascript
    lint: {
      files: [
        'grunt.js',
        'src/js/**.js'
      ]
    },

    // Some typical JSHint options and globals
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },

    // Zip everything up
    compress: {
      target: {
        files: {
          'pack/<%= pkg.name %>.v<%= pkg.version %>.zip': ['dist/**']
        }
      }
    },

  });

  // Load plugins here
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Define your tasks here
  grunt.registerTask('default', ['copy', 'jshint', 'compress']);

/* ================================================================================== */







/* ================================================================================== */

 // #5.1
grunt.initConfig({
    pkg:grunt.file.readJSON('package.json'),

    watch:{
        options:{livereload:true},
        files:['src/**','dist/**'],
        tasks:[]
    },
      express:{
          all:{
              options:{
                  port:3000,
                  hostname:'localhost',
                  bases:['./src'],
                  livereload:true	
              }
          }
      }
});


// #5.2
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-express');

// #5.3
grunt.registerTask('server',['express','watch']);


/* ================================================================================== */


// #6.1
grunt.initConfig({
    pkg:grunt.file.readJSON('package.json'),

    clean: {
        // Deletes all .js files, but skips min.js files
        js: ["./dist/*.js", "!dist/*.min.js"],
      },
    concat: {
        options: {
            separator: ';',
        },
        dist: {
            src: ['src/js/calculator.js', 'src/js/index.js'],
            dest: 'dist/bundle.js',
        },
      }  
});

// #6.2
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-concat');

// #6.3
grunt.registerTask('clean',['concat','clean']);


/* ================================================================================== */


// #7.1 Configuration
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

// Tasks

    sass: {
        dist: {
        options: {
            sourcemap: 'none'
        },
        files: [{
            expand: true,
            cwd: 'sass',
            src: ['src/scss/*.scss'],
            dest: 'dist',
            ext: '.css'
        }]
        }
    },
    postcss: { // Begin Post CSS Plugin
        options: {
          map: false,
          processors: [
            require('autoprefixer')({
                browsers: ['last 2 versions']
                })
            ]
        },
        dist: {
          src: 'css/styles.css'
        }
    },
    cssmin: { // Begin CSS Minify Plugin
        target: {
          files: [{
            expand: true,
            cwd: 'css',
            src: ['src/css/*.css', '!src/css/*.min.css'],
            dest: 'dist',
            ext: '.min.css'
      }]
     }
    },
    uglify: { // Begin JS Uglify Plugin
        build: {
          src: ['src/js/*.js'],
          dest: 'dist/bundle.js'
        }
    },
    watch: { // Compile everything into one task with Watch Plugin
        css: {
          files: 'src/scss/*.scss',
          tasks: ['sass', 'postcss', 'cssmin']
        },
        js: {
          files: 'src/js/*.js',
          tasks: ['uglify']
        }
    }

});

// #7.2 Load Grunt plugins
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-postcss');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');

// #7.3 Register Grunt tasks
grunt.registerTask('build', ['watch']);


/* ================================================================================== */