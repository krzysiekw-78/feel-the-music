const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const gutil = require('gulp-util');
const notify = require("gulp-notify");

function showError(err) {
    notify.onError({
        title: "Gulp error in " + err.plugin,
        message:  err.message
    })(err);

    console.log(gutil.colors.red(err.toString()));
    this.emit('end');
} //funkcja pokazująca błąd dla plumbera

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },//katalog z którego bierze plik index.html
        notify: false//czy pokazywać tooltipa
        //host: "192.168.0.24", //IPv4 Address Wirless LAN adapter WiFi from ipconfig
        //port: 3000, //port na którym otworzy
        //browser: "google chrome" //jaka przeglądarka ma być otwierana - zaleznie od systemu - https://stackoverflow.com/questions/24686585/gulp-browser-sync-open-chrome-only
    });
});

gulp.task('sass', function () {
    return gulp.src('./scss/main.scss')
        .pipe(plumber({
            errorHandler: showError
        })) //poprawia błąd, który wyłącza watch po napotkaniu błędu
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed' //nested, expanded, compact
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            //cascade: false //parametr odpowiadający za układanie w css
        })) //dodaje automatycznie prefiksy
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
}); //watch obserwuje wszystkie pliki i podkatalogi

gulp.task('default', function () {
    console.log(gutil.colors.yellow("---rozpoczynam pracę---"));
    gulp.start(['browser-sync','sass', 'watch']);
}); //główne zadanie wywołujące inne zadania (taski)