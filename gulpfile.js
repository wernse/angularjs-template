var gulp = require('gulp'),
  concat = require('gulp-concat'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-minify-css'),
  templateCache = require('gulp-angular-templatecache'),
  sass = require('gulp-sass'),
  stripDebug = require('gulp-strip-debug');

var fileLocation = 'content/production';
var coreFileName = 'core.js'
var appFileName = 'productionApp.js'

var coreFiles = [
  'public/js/angular.js',
  'public/js/angular-ui-router.js',
  'public/js/ng-file-upload.js',
  'public/js/ui-bootstrap-tpls-2.1.3.js',
  'public/js/templates.js',
]

var appFiles = [
  'app/app.js',
  'app/*.module.js',
  'app/*.controller.js',
  'app/*.factory.js',
  'app/*.component.js',
]

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function () {
  return gulp.src('public/app/**/*.js')
    .pipe(jshint({ 'asi': true }))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('styles', function () {
  gulp.src(['public/css/main.scss', 'public/app/**/*.scss'])
    .pipe(sass({ style: 'compressed' }))
    .pipe(concat('main.css'))
    .pipe(minifyCss({ keepSpecialComments: 0 }))
    .pipe(gulp.dest('public/css/'))
})

gulp.task('templates', function () {
  return gulp.src('public/**/*.html')
    .pipe(templateCache({ standalone: true }))
    .pipe(gulp.dest('public/js'));
});

gulp.task('concatCore', function () {
  gulp.src(coreFiles)
    .pipe(concat(coreFileName))
    .pipe(gulp.dest(fileLocation + "/"));
});

gulp.task('concatApp', function(){
   gulp.src(appFiles)
    .pipe(concat(appFileName))
    .pipe(gulp.dest(fileLocation + "/"));
})

gulp.task('production', function () {
  gulp.src(fileLocation + "/" + coreFileName)
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(fileLocation + "/"));
  gulp.src(fileLocation + "/" + appFileName)
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(fileLocation + "/"));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function () {
  gulp.watch(['public/css/main.scss', 'public/app/**/*.scss'], ['styles']);
  gulp.watch(['app/*.js'], ['concatApp']);
  gulp.watch(['content/*.js'], ['concatCore']);
  gulp.watch('app/**/*.html', ['templates']);
});



