let gulp = require('gulp');
let postcss = require('gulp-postcss');
let browserSync = require('browser-sync');
let del = require('del');
let rename = require('gulp-rename');
let header = require('gulp-header');
let cssnano = require('cssnano');
let nunjucksRender = require('gulp-nunjucks-render');
let rev = require('gulp-rev');
let revReplace = require('gulp-rev-replace');

let project = {
	src: 'src',
	build: 'dist',
	html: {
		src: 'src/*.html',
		build: 'dist/*.html',
	},
	css: {
		src: 'src/pcss/main.pcss',
		build: 'main.css',
		dir: 'src/pcss',
	},
	js: {
		src: 'src/js',
		build: 'dist/js',
	},
	img: {
		src: 'src/img',
		build: 'dist/img',
		allExtensions: '**/*.{png,jpg,gif,svg}',
	},
};

function handleError(err) {
	console.log(err.toString()); // eslint-disable-line no-console
	this.emit('end');
}

gulp.task('clean', function() {
	return del([`${project.build}/**/*`], {
		dot: true,
	});
});

gulp.task('html', function() {
	return gulp
		.src(project.html.src)
		.pipe(
			nunjucksRender({
				path: [project.src],
				envOptions: {
					autoescape: false,
					watch: false,
				},
				data: {},
			})
		)
		.on('error', handleError)
		.pipe(gulp.dest(project.build))
		.pipe(browserSync.stream());
});

let processors = [
	require('postcss-import')(),
	require('postcss-mixins')(),
	require('postcss-nested')(),
	require('postcss-simple-vars')(),
	require('postcss-property-lookup')(),
	require('postcss-assets')({
		basePath: 'src',
	}),
	require('postcss-inline-svg')({
		paths: ['src'],
	}),
	require('postcss-calc')(),
	require('postcss-hexrgba')(),
	require('postcss-custom-media')(),
	require('postcss-media-minmax')(),
	require('lost')(),
	require('autoprefixer')(),
];

gulp.task('styles:default', function() {
	return gulp
		.src(project.css.src)
		.pipe(postcss(processors))
		.on('error', handleError)
		.pipe(rename(project.css.build))
		.pipe(gulp.dest(project.build))
		.pipe(browserSync.stream());
});

gulp.task('styles:minify', function() {
	return gulp
		.src(`${project.build}/${project.css.build}`)
		.pipe(
			postcss([
				cssnano({
					preset: [
						'default',
						{
							cssDeclarationSorter: false, // could have problems with incorrect sorting
							mergeLonghand: false,
							svgo: false, // removes viewBox
						},
					],
				}),
			])
		)
		.on('error', handleError)
		.pipe(gulp.dest(project.build));
});

gulp.task('styles', gulp.series('styles:default', 'styles:minify'));

gulp.task('copy:images', function() {
	return gulp
		.src([`${project.img.src}/${project.img.allExtensions}`], {
			since: gulp.lastRun('copy:images'),
		})
		.pipe(gulp.dest(project.img.build))
		.pipe(browserSync.stream());
});

gulp.task('copy:js', function() {
	return gulp
		.src(`${project.js.src}/*.js`, { since: gulp.lastRun('copy:js') })
		.pipe(gulp.dest(project.js.build))
		.pipe(browserSync.stream());
});

gulp.task('copy:other', function() {
	return gulp
		.src([`${project.src}/public/**`])
		.pipe(gulp.dest(project.build))
		.pipe(browserSync.stream());
});

gulp.task('copy', gulp.parallel('copy:images', 'copy:js', 'copy:other'));

gulp.task('rev', function() {
	return gulp
		.src([`${project.build}/*.css`, `${project.build}/{js,img}/**/*`])
		.pipe(rev())
		.pipe(gulp.dest(project.build))
		.pipe(rev.manifest())
		.pipe(gulp.dest(project.build));
});

gulp.task('revreplace', function() {
	const manifest = gulp.src(`${project.build}/rev-manifest.json`);

	return gulp
		.src(project.html.build)
		.pipe(revReplace({ manifest }))
		.pipe(gulp.dest(project.build));
});

gulp.task('banner', function() {
	return gulp
		.src(`${project.build}/${project.css.build}`)
		.pipe(
			header(
				'/*\n' +
					'Author:     Aleks Hudochenkov (hudochenkov.com)\n' +
					'Version:    <%= date %>\n' +
					'-----------------------------------------------------------------------------*/\n',
				{
					date: new Date()
						.toJSON()
						.slice(0, 10)
						.split('-')
						.reverse()
						.join('.'),
				}
			)
		)
		.pipe(gulp.dest(project.build));
});

gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: project.build,
		},
		notify: false,
		online: false,
		ghostMode: false,
	});
});

gulp.task('watch', function() {
	gulp.watch([`${project.css.dir}/*.pcss`], gulp.series('styles:default'));

	gulp.watch([`${project.img.src}/${project.img.allExtensions}`], gulp.series('copy:images'));

	gulp.watch([`${project.js.src}/*.js`], gulp.series('copy:js'));

	gulp.watch([`${project.src}/**/*.html`], gulp.series('html'));
});

gulp.task(
	'default',
	gulp.series(gulp.parallel('styles:default', 'html', 'copy'), gulp.parallel('server', 'watch'))
);

gulp.task(
	'build',
	gulp.series(
		'clean',
		gulp.parallel(gulp.series('styles:default', 'styles:minify', 'banner'), 'html', 'copy'),
		'rev',
		'revreplace'
	)
);
