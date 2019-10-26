const {
    src,
    dest,
    watch,
    parallel
} = require('gulp');

const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');

function sass2css(done) {
    src("./public/stylesheets/source/app.scss")
        .pipe(sass({
            outputStyle: "compressed"
        }).on('error', sass.logError))
        .pipe(dest("./public/stylesheets/dist/css/"));
    done();
}

function gulpNodemon(done) {
    nodemon({
        script: './bin/www'
    })
    done();
}

watch("./public/stylesheets/source/**/*.scss", sass2css);

module.exports.default = parallel(sass2css, gulpNodemon);