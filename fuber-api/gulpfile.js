'use strict';
/*
 *gulp functions
 */

const gulp = require('gulp');
const rename = require('gulp-rename');
const inject = require('gulp-inject');
const env = require('gulp-env');
const nodemon = require('gulp-nodemon');
const fs = require('fs');
const wiredep = require('gulp-wiredep');
const mocha = require('gulp-mocha');
const prettify = require('gulp-jsbeautifier');
const eslint = require('gulp-eslint');

/*
 * Paths to App files
 */
var paths = {
  server: ['server.js', 'gulpfile.js', '!app/**/*.spec.js',
    'app/**/*.js', '!app/tests/mocks/**'
  ],
  client: ['public/**/*.js', '!public/everything.js'],
  cfg: ['config/**/*.js'],
  html: ['public/**/*.html'],
  sass: ['styles/app.scss'],
  sassWatch: ['styles/**/*.scss', 'public/**/*.scss']
};

/**
 * Inject JS to index.html
 */

gulp.task('inject', () => {
  return gulp.src(['public/index.html.in'])
    .pipe(rename('index.html'))
    .pipe(inject(gulp.src(paths.client), {
      addRootSlash: false,
      ignorePath: 'public'
    }))
    .pipe(wiredep({
      directory: 'bower_components'
    }))
    .pipe(gulp.dest('public'));
});

// Set environment variables in development environment
gulp.task('set-env', () => {
  // First check to see if the env file exists
  if (fs.existsSync('./env.json')) {
    env({
      file: 'env.json',
      vars: {}
    });
  } else {
    console.log('**WARNING** Please create an env.json file');
  }
});

/*
 * Start web server
 */
gulp.task('dev-server', () => {
  nodemon({
    script: 'server.js',
    ext: 'js'
  });
});

/**
 * Beautify JS
 */
gulp.task('beautify', function () {
  gulp.src([].concat(paths.server, paths.client, paths.cfg, paths.html), {
      base: '.'
    })
    .pipe(prettify({
      config: '.jsbeautifyrc',
      mode: 'VERIFY_AND_WRITE'
    }))
    .pipe(gulp.dest('.'));
});

/**
 * JavaScript Linting Task
 */
gulp.task('lint', function () {
  return gulp.src([].concat(paths.server, paths.client, paths.cfg, '!public/app.config.js'))
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('start', [
  'set-env',
  'inject',
  'dev-server'
]);

gulp.task('test', (cb) => {
  process.env.NODE_ENV = 'test';
  gulp.src(['app/**/*.spec.js'])
    .pipe(mocha())
    .on('end', cb);
});