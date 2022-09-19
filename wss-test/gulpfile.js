"use strict";
/*
- gulp dev     - збірка проєкта для роботи, з MAP-файлами, та зробить збірку для прода (папка dist), рівнем вище :)
*/
var path = {
	dist: {
		html: 'dist/',
		js: 'dist/js',
		css: 'dist/css',
		img: 'dist/img',
		fonts: 'dist/fonts',
		// libs: 'dist/libs'
	},
	src: {
		html: 'src/pages/*.html',
		js: 'src/js/*.js',
		sass: 'src/sass/**/*.sass',
		css: 'src/css/',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*',
		// libs: 'src/libs/**/*.*',
	},
	clean: 'dist'
};

var gulp = require('gulp'),

		sass = require('gulp-sass')(require('sass')), 
		autoprefixer = require('autoprefixer'), 
		postcss = require('gulp-postcss'),
		browserSync = require('browser-sync').create(), 
		useref = require('gulp-useref'), 
		cache = require('gulp-cache'), 
		plumber = require('gulp-plumber'), 
		uglify = require('gulp-uglify'),
		sourcemaps = require('gulp-sourcemaps'), 
		cleanCSS = require('gulp-clean-css'), 
		minifyCss = require('gulp-minify-css'),
		gulpif = require('gulp-if'),
		imagemin = require('gulp-imagemin'), 
		jpegrecompress = require('imagemin-jpeg-recompress'), 
		pngquant = require('imagemin-pngquant'), 
		{del} = import('del'),
		replace = require('gulp-string-replace'), 
		rigger = require('gulp-rigger'), 
		runSequence = require('run-sequence'),
		babel = require('gulp-babel'), 
		removeHtmlComments = require('gulp-remove-html-comments'), 
		include = require('gulp-file-include');


gulp.task('sass', function (cb) {
	return gulp.src(path.src.sass)
	.pipe(plumber()) 
	.pipe(sourcemaps.init()) 
	.pipe(sass()) 
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(path.dist.css)) 
	.pipe(browserSync.stream());
	cb();
});

gulp.task('sass:build', function (cb) {
	return gulp.src(path.src.sass)
	.pipe(plumber()) 
	.pipe(sass()) 
	.pipe(postcss([autoprefixer()]))
	.pipe(cleanCSS()) 
	.pipe(gulp.dest(path.dist.css));  
	cb();
});

gulp.task('build:delhtmlcomm', function (cb) { 
	return gulp.src('dist/**/*.html')
	.pipe(removeHtmlComments())
	.pipe(gulp.dest('dist'));
	cb();
});

gulp.task('watch', function (cb) {
	browserSync.init({
		server: './dist'
	});
	gulp.watch('src/pages/**/*.html', gulp.parallel('views'));
	gulp.watch('src/sass/**/*.sass', gulp.parallel('sass'));
	gulp.watch('src/js/**/*.js', gulp.parallel('script'));
	gulp.watch('src/img/**/*.*', gulp.parallel('images'));
	gulp.watch('src/fonts/**/*.*', gulp.parallel("fonts"));
	cb();
});

gulp.task("views", () => {
	return gulp.src(path.src.html)
	.pipe(include({
		prefix: "@@",
		basepath: "@file"
	}))
	.pipe(gulp.dest(path.dist.html))
	.pipe(browserSync.stream());
});

gulp.task('script', (cb) => {  
	return gulp.src('src/js/**/*')
	// .pipe(babel({
	//     presets: ['@babel/env']
	// }))
	.pipe(uglify())
	.pipe(gulp.dest(path.dist.js))
	.pipe(browserSync.stream());
	cb();
});

gulp.task('images', function (cb) {
	return gulp.src(path.src.img) 
	.pipe(cache(imagemin([ 
		imagemin.gifsicle({interlaced: true}),
		jpegrecompress({
			progressive: true,
			max: 90,
			min: 80
		}),
		pngquant(),
		imagemin.svgo({plugins: [{removeViewBox: false}]})
	])))
	.pipe(gulp.dest(path.dist.img)) 
	.pipe(browserSync.stream());
	cb();
});


gulp.task('fonts', function () {
	return gulp.src('src/fonts/**/*')
	.pipe(gulp.dest(path.dist.fonts))
	.pipe(browserSync.stream());
});

gulp.task('clean', function (cb) {
	del('dist');
	cb();
});

//gulp.task('default', gulp.series('sass','watch'));
//gulp.task('dev', gulp.series('watch'));
gulp.task('dev',
		gulp.series(
				gulp.parallel(['views', 'sass', 'script', 'images', 'fonts']),
				gulp.parallel('watch')
		)
);

gulp.task('build', gulp.series('clean', 'sass:build', 'views', 'images', 'fonts', 'script', 'build:delhtmlcomm', function (done) {
	done();
}));