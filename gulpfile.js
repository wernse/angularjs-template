var gulp = require('gulp'),
  concat = require('gulp-concat'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-minify-css'),
  templateCache = require('gulp-angular-templatecache'),
  sass = require('gulp-sass'),
  stripDebug = require('gulp-strip-debug'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload;

var fileLocation = 'content/production';
var coreFileName = 'core.js'
var appFileName = 'productionApp.js'

var coreFiles = [
  'content/js/angular.js',
  'content/js/angular-ui-router.js',
  'content/js/ng-file-upload.js',
  'content/js/ui-bootstrap-tpls-2.1.3.js',
]

var appFiles = [
  'app/app.js',
  'content/js/templates.js',
  'app/**/*.module.js',
  'app/**/*.controller.js',
  'app/**/*.factory.js',
  'app/**/*.component.js',
]

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('app/**/*.js')
    .pipe(jshint({
      "latedef": "nofunc",
      "strict": true,
    }))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('styles', function() {
  gulp.src(['content/css/siteVariables.scss', 'app/**/*.scss'])
    .pipe(sass({
      style: 'compressed'
    }))
    .pipe(concat('main.css'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest('content/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
})

gulp.task('templates', function() {
  gulp.src('app/**/*.html')
    .pipe(templateCache({
      standalone: true,
      root: '/'
    }))
    .pipe(gulp.dest('content/js'));
  reload();
});

gulp.task('concatCore', function() {
  gulp.src(coreFiles)
    .pipe(concat(coreFileName))
    .pipe(gulp.dest(fileLocation + "/"));
});

gulp.task('concatApp', function() {
  gulp.src(appFiles)
    .pipe(concat(appFileName))
    .pipe(gulp.dest(fileLocation + "/"));
  reload();

})

gulp.task('production', function() {
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
gulp.task('watch', function() {
  browserSync.init({
    proxy: "localhost:3000"
  })

  gulp.watch(['content/css/main.scss', 'app/**/*.scss'], ['styles']);
  gulp.watch(['app/**/*.js'], ['concatApp', 'jshint']);
  gulp.watch(['content/js/*.js'], ['concatCore']);
  gulp.watch('app/**/*.html', ['templates']);
});