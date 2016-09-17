var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    sourcemaps   = require('gulp-sourcemaps'),
    gulpIf       = require('gulp-if'),
    spritesmith  = require('gulp.spritesmith'),
    svgstore     = require('gulp-svgstore'),
    svgmin       = require('gulp-svgmin'),
    path         = require('path'),
    uglify       = require('gulp-uglifyjs'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    notify       = require('gulp-notify'),
    cssnano      = require('gulp-cssnano'),
    haml         = require('gulp-haml'),
    browserSync  = require('browser-sync');
  
gulp.task('sass', function () {
    return gulp.src('src/sass/main.scss')
    .pipe(sass()
    .on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8']))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream: true}));    
});

gulp.task('scripts', function () {
    return gulp.src(['src/libs/*.js'])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'));
})

gulp.task('haml', function() {
  gulp.src('')
    .pipe(haml())
    .on('error', notify.onError())
    .pipe(gulp.dest('src/'))
});

gulp.task('svgstore', function () {
    return gulp
        .src('src/images/icons/svg/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('src/images/icons/svg'));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('src/images/icons/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
  }));
  return spriteData.pipe(gulp.dest('src/images/icons'));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});

gulp.task('clean', function () {
    return del.sync('build');
});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('img', function () {
    return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    })))
    .pipe(gulp.dest('build/images'));
})

gulp.task('watch',['browser-sync','sass', 'scripts'], function () {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/template/*.haml', ['haml'], browserSync.reload);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean','sass', 'img', 'scripts'], function () {
    
    var buildCss = gulp.src('src/css/main.css')
      .pipe(cssnano())
      .pipe(gulp.dest('build/css'));
    
    var buildFonts = gulp.src('src/fonts/**/*')
      .pipe(gulp.dest('build/fonts'));
    
    var buildJs = gulp.src('src/js/**/*')
      .pipe(gulp.dest('build/js'));
            
    var buildHtml = gulp.src('src/*.html')
      .pipe(gulp.dest('build/'));
    
});