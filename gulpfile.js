var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var eventStream = require('event-stream');
var exec = require('child_process').exec;
var karma = require('karma');
var path = require('path');
var preprocess = require('gulp-preprocess');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var watch = require('gulp-watch');
var useSeparateDev = false;

var paths = require('./config/gulp.config');

/**
 * Development tasks
 */
gulp.task('dev:clean', function() {
	return gulp.src(paths.dev.cleanSrc, { read: false })
		.pipe(clean());
});

gulp.task('dev:clean:separate', function() {
	return gulp.src(paths.dev.separateDest.appDest, { read: false })
		.pipe(clean());
});

gulp.task('dev:compile:sass', function(done) {
	return gulp.src(paths.sassSrc)
		.pipe(sass())
		.pipe(gulp.dest(useSeparateDev ? paths.dev.separateDest.sassDest : paths.dev.sassDest))
		.pipe(connect.reload());
});

gulp.task('dev:compile:typescript', function() {
	var tsProject = ts.createProject('./tsconfig.json');
	var tsResult = tsProject.src()
		.pipe(tsProject());

	return tsResult.js
		.pipe(gulp.dest(useSeparateDev ? paths.dev.separateDest.typescriptDest : paths.dev.typescriptDest))
		.pipe(connect.reload());
});

gulp.task('dev:copy:vendor-js', function(done) {
	var streams = paths.vendorJsLibs.dev.map(function(ref) {
		return gulp.src(ref.path, { base: ref.singleFile ? '' : paths.vendorJsLibs.nodeModulesRoot })
			.pipe(gulp.dest(ref.dest ? path.join(paths.dev.vendorJsDest, ref.dest) : paths.dev.vendorJsDest));
	});

	return eventStream.concat.apply(eventStream, streams);
});

gulp.task('dev:copy:static:separate', function(done) {
	gulp.src(paths.dev.separateDest.staticSrc, { base: './' })
		.pipe(gulp.dest(paths.dev.separateDest.appDest));

	setTimeout(function() {
		gulp.src(paths.dev.separateDest.serverRoot)
			.pipe(connect.reload());

		done();
	}, 1000);
});

gulp.task('dev:tslint', function() {
	return gulp.src(paths.dev.tslintDest)
        .pipe(tslint())
        .pipe(tslint.report('prose'));
});

/**
 * Production tasks
 */
gulp.task('prod:bundle:js', function(done) {
	var vendorBundleDest = path.join(paths.prod.vendorJsDest, paths.prod.vendorBundleDest);
	var aotBundleDest = path.join(paths.prod.vendorJsDest, paths.prod.appAotDest);

	gulp.src(paths.vendorJsLibs.prod)
		.pipe(concat(paths.prod.vendorBundleDest))
		.pipe(gulp.dest(paths.prod.vendorJsDest))
		.on('finish', function() {
			gulp.src([vendorBundleDest, aotBundleDest])
				.pipe(concat(paths.prod.appBundleDest))
				.pipe(gulp.dest(paths.prod.vendorJsDest))
				.on('finish', function() {
					gulp.src([vendorBundleDest, aotBundleDest], { read: false })
						.pipe(clean());

					done();
				});
		});
});

gulp.task('prod:bundle:vendor-css', function() {
	return gulp.src(paths.prod.vendorCssSrc)
		.pipe(concat(paths.prod.vendorCssOutFile))
		.pipe(gulp.dest(paths.prod.vendorCssDest));
});

gulp.task('prod:clean', function() {
	return gulp.src(paths.prod.cleanSrc, { read: false })
		.pipe(clean());
});

gulp.task('prod:clean:post', function(done) {
	gulp.src(paths.prod.aotTempDest, { read: false })
		.pipe(clean());

	gulp.src(paths.prod.vendorCssCleanDest, { read: false })
		.pipe(clean());

	done();
});

gulp.task('prod:compile:aot', function(done) {
	exec('npm run aot || npm run aot-win && npm run aot-rollup || npm run aot-rollup-win', function(err) {
		if (err) {
			console.log(err);
		}

		done();
	});
});

gulp.task('prod:compile:sass', function() {
	return gulp.src(paths.sassSrc)
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(gulp.dest(paths.prod.sassDest));
});

gulp.task('prod:copy:static', function() {
	return gulp.src(paths.prod.staticSrc, { base: paths.prod.staticBase })
		.pipe(gulp.dest(paths.prod.staticDest));
});

gulp.task('prod:preprocess:html', function() {
	return gulp.src(paths.prod.htmlSrc)
		.pipe(preprocess())
		.pipe(gulp.dest(paths.prod.htmlDest));
});

/**
 * Server tasks
 */
gulp.task('reload:dev', function() {
	return gulp.src(paths.dev.serverRoot)
		.pipe(connect.reload());
});

gulp.task('serve:dev', function() {
	connect.server({
		port: '8080',
		root: paths.dev.serverRoot,
		fallback: paths.dev.serverFallback,
		livereload: true
	});
});

gulp.task('serve:dev:separate', function() {
	connect.server({
		port: '8080',
		root: paths.dev.separateDest.serverRoot,
		fallback: paths.dev.separateDest.serverFallback,
		livereload: true
	});
});

gulp.task('serve:prod', function() {
	connect.server({
		port: '8081',
		root: paths.prod.serverRoot,
		fallback: paths.prod.serverFallback,
		livereload: true
	});
});

gulp.task('watch:dev', function() {
	gulp.watch(paths.dev.serverFileWatchers.all, ['reload:dev']);
});

gulp.task('watch-compile:dev', function() {
	gulp.watch(paths.typescriptSrc, ['dev:compile:typescript']);
	gulp.watch(paths.sassSrc, ['dev:compile:sass']);
	gulp.watch(paths.dev.serverFileWatchers.watchCompile, ['reload:dev']);
});

gulp.task('watch-compile:dev:separate-dev', function() {
	gulp.watch(paths.typescriptSrc, ['dev:compile:typescript']);
	gulp.watch(paths.sassSrc, ['dev:compile:sass']);
	gulp.watch(paths.dev.serverFileWatchers.watchCompile, ['dev:copy:static:separate']);
});

/**
 * Main tasks
 */
gulp.task('build:dev', function(done) {
	runSequence('dev:clean', 'dev:compile:sass', 'dev:copy:vendor-js', 'dev:compile:typescript', done);
});

gulp.task('build:dev:separate', function(done) {
	runSequence('dev:clean', 'dev:clean:separate', 'dev:compile:sass', 'dev:copy:vendor-js', 'dev:copy:static:separate', 'dev:compile:typescript', done);
});

gulp.task('build:prod', function(done) {
	runSequence('prod:clean', 'dev:compile:sass', 'prod:compile:sass', 'dev:compile:typescript', 'prod:compile:aot', 'prod:bundle:js', 'prod:bundle:vendor-css', 'prod:preprocess:html', 'prod:copy:static', 'prod:clean:post', done);
});

gulp.task('start:dev', function(done) {
	runSequence('build:dev', 'serve:dev', 'watch-compile:dev', done);
});

gulp.task('start:dev:staging', function(done) {
	useSeparateDev = true;
	runSequence('build:dev:separate', 'serve:dev:separate', 'watch-compile:dev:separate-dev', done);
});

gulp.task('start:prod', function(done) {
	runSequence('build:prod', 'serve:prod', done);
});

gulp.task('test:unit', function(done) {
	new karma.Server({
		configFile: __dirname + '/karma.conf.js'
	}, done).start();
});

gulp.task('default', function(done) {
	runSequence('build:dev', 'serve:dev', 'watch:dev', done);
});