var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),

    clean = require('gulp-clean'),

    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    templateCache = require('gulp-angular-templatecache'),
    ngAnnotate = require('gulp-ng-annotate'),
    sass = require('gulp-sass'),
    stripDebug = require('gulp-strip-debug'),
    imagemin = require('gulp-imagemin'),
    karma = require('karma').server;

    // define the default task and add the watch task to it
    gulp.task('default', ['watch']);

    // configure the jshint task
    gulp.task('jshint', function() {
      return gulp.src('public/app/**/*.js')
        .pipe(jshint({'asi':true}))
        .pipe(jshint.reporter('jshint-stylish'));
    });

    gulp.task('styles', function () {
      gulp.src(['public/css/main.scss','public/app/**/*.scss'])
      .pipe(sass({ style: 'compressed' }))
      .pipe(concat('main.css'))
      .pipe(minifyCss({keepSpecialComments : 0}))
      .pipe(gulp.dest('public/css/'))
    })

    gulp.task('templates', function () {
      return gulp.src('public/**/*.html')
        .pipe(templateCache({standalone:true}))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('public/js'));
    });        

    gulp.task('production', function() {
      gulp.src(files)
      .pipe(concat('production.js'))
      .pipe(stripDebug())
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(gulp.dest('public/'))

    });

    gulp.task('images', function() {
      gulp.src('public/**/*.png')
      .pipe(imagemin({
        progressive: true
      }))
      .pipe(gulp.dest('test/'))

    });
    // configure which files to watch and what tasks to use on file changes
    gulp.task('watch', function() {
      gulp.watch(['public/css/main.scss','public/app/**/*.scss'], ['styles']);
      gulp.watch('public/**/*.html', ['templates']);
      gulp.watch([ "test/spec/**/*.js"], ["tdd"]);

    });


    karmaConfig = {
      "files": [
      'public/js/angular.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'public/app/**/*Module.js',
      'public/app/**/*Factory.js',
      'public/app/**/*Ctrl.js',


      'test.js',
      'test/spec/**/*.js',

      ],
      "singleRun": false,
      "frameworks": ["jasmine"],
      "browsers": ["Chrome"]
    }


    /**
     * Watch for file changes and re-run tests on each change
     */
    gulp.task('tdd', function (done) {
      karma.start(karmaConfig, done);
    });

    files = [
    'public/js/jquery-2.0.3.min.js',
    'public/js/angular.min.js',
    'public/js/flat-ui.min.js',
    'public/js/angular-touch.min.js',
    'public/js/ui-bootstrap-tpls-0.13.0.min.js',
    'public/js/angular-route.min.js',
    'public/js/angular-animate.min.js',
    'public/js/angular-resource.js',
    'public/js/angular-file-upload.min.js',
    'public/js/d3.min.js',
    'public/js/highcharts-ng.js',
    'public/js/highcharts.js',
    'public/js/templates.js',

    'public/app/app.js',
    'public/app/parentCtrl.js',

    'public/app/cluster/clusterModule.js',
    'public/app/cluster/clusterCtrl.js',
    'public/app/cluster/clusterFactory.js',


    'public/app/metrics/metricsModule.js',
    'public/app/metrics/metricsCtrl.js',
    'public/app/metrics/metricsFactory.js',

    'public/app/upload/uploadModule.js',
    'public/app/upload/uploadFactory.js',
    'public/app/upload/uploadCtrl.js',

    'public/app/basket/basketModule.js',
    'public/app/basket/basketFactory.js',
    'public/app/basket/basketCtrl.js',

    'public/app/report/reportModule.js',
    'public/app/report/reportFactory.js',
    'public/app/report/reportCtrl.js',


    'public/app/shareModal/shareModule.js',
    'public/app/shareModal/shareModalCtrl.js',
    'public/app/shareModal/shareFactory.js',

    'public/app/basket/calculator/calculatorModule.js',
    'public/app/basket/calculator/calculatorModalCtrl.js',
    'public/app/basket/calculator/calculatorModalFactory.js',
    'public/app/basket/calculator/slider.js',

    'public/js/loading-bar.js',
    'public/js/d3.min.js',

    'public/app/simqly/app.js',
    'public/app/simqly/data.js',
    'public/app/simqly/directives.js',
    'public/app/simqly/filters.js',

    'public/app/simqly/dashboard/pageCtrl.js',

    'public/app/simqly/analyze/analyzeCtrl.js',
    'public/app/simqly/analyze/analyzeFactory.js',
    'public/app/simqly/analyze/graphClickModalCtrl.js',

    'public/app/simqly/graphTests/module2.js',
    'public/app/simqly/graphTests/d3Ctrl.js',
    'public/app/simqly/graphTests/d3Factory.js',
    'public/app/simqly/graphTests/slider.js',

    'public/app/simqly/graphs/barcsv.js',
    'public/app/simqly/graphs/scatter.js',
    'public/app/simqly/graphs/histo.js',
    'public/app/simqly/graphs/stacked.js'
    ]

