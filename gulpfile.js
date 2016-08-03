const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const cp = require('child_process');
const webpack = require('webpack-stream');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const minifyCss = require('gulp-minify-css');

var children = [];
var appFiles = ['*.js', 'lib/**/*.js', 'test/**/*.js', './routes/**/*.js', './models/**/*.js'];
var testFiles = [
  'test/router_badge_test.js',
  'test/router_webproject_test.js',
  'test/router_gameproject_test.js'
];

gulp.task('webpack:dev', () => {
  gulp.src('app/js/entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('webpack:test', () => {
  gulp.src('./test/front_end/unit/test_entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      module: {
        loaders: [{
          test: /\.html$/,
          loader: 'html'
        }]
      },
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./test'));
});

gulp.task('static:dev', ['webpack:dev'], () => {
  gulp.src(['app/**/*.html'])
    .pipe(gulp.dest('./build'));
});

gulp.task('test:mocha', () => {
  return gulp.src(testFiles)
    .pipe(mocha());
});

gulp.task('lint:testFiles', () => {
  return gulp.src(testFiles)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('lint:appFiles', () => {
  return gulp.src(appFiles)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('sass:dev', () => {
  return gulp.src('app/sass/**/*.scss')
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(maps.write())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('sass:watch', ['sass:dev'], () => {
  gulp.watch('./app/sass/**/*.scss');
});

gulp.task('image:dev', () => {
  gulp.src('app/images/*')
    .pipe(gulp.dest('./build/images'));
});

gulp.task('start:server', () => {
  children.push(cp.fork('server.js'));
  children.push(cp.spawn('mongod', ['--dbpath=./db']));
  children.push(cp.fork('server.js', [], { env: {
    MONGOD_URI: 'mongod://localhost/portfolio_test_db' } }));
  children.push(cp.spawn('webdriver-manager', ['start']));
});

gulp.task('build:dev', ['webpack:dev', 'static:dev', 'sass:dev', 'image:dev']);
gulp.task('style:dev', ['sass:dev', 'image:dev', 'build:dev']);
gulp.task('test', ['test:mocha']);
gulp.task('lint', ['lint:testFiles', 'lint:appFiles']);

gulp.task('default', ['lint', 'test']);
