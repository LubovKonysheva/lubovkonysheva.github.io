const { src, dest } = require("gulp");
 
function copy() {
   return src('src/styles/first.scss').pipe(dest('dist'));
}
 
exports.copy = copy;