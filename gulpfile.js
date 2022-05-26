const { src, dest, task, series, watch } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
const env = process.env.NODE_ENV;

 
sass.compiler = require('node-sass');
 
task('clean', () => {
 return src('dist/**/*', { read: false })
   .pipe(rm())
})
 
task('copy:html', () => {
 return src('src/*.html')
   .pipe(dest('dist'))
   .pipe(reload({ stream: true }));
})
 
const styles = [
 'node_modules/normalize.css/normalize.css',
 "src/styles/main.scss"
];
 
task('styles', () => {
 return src(styles)
  .pipe(gulpif(env === 'dev', sourcemaps.init()))
  .pipe(concat('main.min.scss'))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  .pipe(px2rem())
  //  .pipe(gulpif(env === 'prod', gcmq()))
  .pipe(gulpif(env === 'prod', autoprefixer({
    cascade: false
  })))
  .pipe(gulpif(env === 'prod', cleanCSS()))
  .pipe(gulpif(env === 'dev', sourcemaps.write()))
  .pipe(dest('dist'))
  .pipe(reload({ stream: true }));
});

const libs = [
  'node_modules/jquery/dist/jquery.js',
  'src/script/*.js'
 ];

task('scripts', (libs) => {
  return src('src/script/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js', {newLine: ';'}))
    .pipe(gulpif(env === 'prod', babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
 });
 
task('server', () => {
 browserSync.init({
     server: {
         baseDir: "./dist"
     },
     open: false
 });
});
 
watch('./src/styles/**/*.scss', series('styles'));
watch('./src/*.html', series('copy:html'));
watch('./src/script/*.js', series('scripts'));
 
task('default', series('clean', 'copy:html', 'styles', 'scripts', 'server'));
task('build', series('clean','copy:html', 'styles', 'scripts', 'icons'));