var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');


// #1 Writing Your First Gulp Task
gulp.task('hello-world', function() {
    console.log('Hello World');
});


// #2 Preprocessing with Gulp     
gulp.task('sass', function(){
    return gulp.src('src/scss/styles.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('src/css'))
});

// #3 Globbing in Node
gulp.task('sass-global', function() {
    return gulp.src('src/scss/**/*.scss') // Gets all files ending with .scss in src/scss and children dirs
      .pipe(sass())
      .pipe(gulp.dest('src/css'))
});

// #4.1 Watching Sass files for changes
gulp.watch('src/scss/**/*.scss', ['sass']);

// #4.2 Group together multiple watch processes
gulp.task('watch', function(){
    gulp.watch('src/scss/**/*.scss', ['sass-global']); 
});


// #5.1 Live-reloading with Browser Sync
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
        baseDir: 'src'
        },
    });
});

// #5.2 sass task slightly with Browser Sync to reload
gulp.task('sass-reload', function() {
    return gulp.src('src/scss/**/*.scss') // Gets all files ending with .scss in app/scss
      .pipe(sass())
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
  });

// #5.3 Run browsersync and sass concurrently at once before watch
gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch('src/scss/**/*.scss', ['sass']); 
});

// #5.4 We can watch html and js files also
gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch('src/scss/**/*.scss', ['sass']); 
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('src/*.html', browserSync.reload); 
    gulp.watch('src/js/**/*.js', browserSync.reload); 
  });

// #6 Optimizing CSS and JavaScript files
gulp.task('useref', function(){
    return gulp.src('src/*.html')
      .pipe(useref())
      .pipe(gulp.dest('dist'))
  });

// #7 Minifying JavaScript files only if its a javascript file
gulp.task('useref', function(){
return gulp.src('src/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
});

// #8 Minifying JavaScript files only if its a css file
gulp.task('useref', function(){
    return gulp.src('src/*.html')
      .pipe(useref())
      .pipe(gulpIf('*.js', uglify()))
      // Minifies only if it's a CSS file
      .pipe(gulpIf('*.css', cssnano()))
      .pipe(gulp.dest('dist'))
  });

// #9.1 Optimizing Images
gulp.task('images', function(){
return gulp.src('src/images/**/*.+(png|jpg|gif|svg)')
.pipe(imagemin())
.pipe(gulp.dest('dist/images'))
});

// #9.2 Optimizing Images Interlaced
gulp.task('interlaced-images', function(){
    return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imagemin({
        // Setting interlaced to true
        interlaced: true
      }))
    .pipe(gulp.dest('dist/images'))
  });

// #10 Caching the Images in the hard disk memory
gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
        interlaced: true
      })))
    .pipe(gulp.dest('dist/images'))
  });

// #11 Copying Fonts to Dist
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
    });

// #12 Cleaning up generated files automatically
gulp.task('clean:dist', function() {
    return del.sync('dist');
    })

// #13 Combining Gulp tasks simultaneously or paraller
gulp.task('build', [`clean`, `sass`, `useref`, `images`, `fonts`], function (){
    console.log('Building files');
  })

// #14 Combining Gulp tasks to run one after one or series with the help of run sequence
gulp.task('build', function (callback) {
runSequence('clean:dist', 
    ['sass', 'useref', 'images', 'fonts'],
    callback
)
})

// #15 Why default? Because when you have a task named default, you can run it simply by typing the gulp command, which saves some keystrokes
gulp.task('default', function (callback) {
runSequence(['sass','browserSync', 'watch'],
    callback
)
})


// Tasks that are actually useful.
// npm shrinkwrap
// concat
// jshint
// sourcemaps (gulp-sourcemaps)