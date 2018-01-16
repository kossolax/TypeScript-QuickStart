const gulp = require("gulp");
const fs = require("fs");
const rollup = require("rollup").rollup;
const rollupTS = require("@alexlur/rollup-plugin-typescript");
const typescript = require("typescript");

const src = "src";
const dst = "dst";

function bundle(fileTS, fileJS, sourceMap) {
    return rollup({
        input: src + "/" + fileTS,
        plugins: [rollupTS({ typescript: typescript })],
        sourcemap: sourceMap
    })
    .then( bundle => {
        return bundle.generate({
            name: "ACIC",
            format: "cjs",
            sourcemap: sourceMap,
            sourcemapFile: dst + "/"+fileJS+".map",
        }).then(result => {
            fs.writeFileSync(dst + "/"+fileJS, result.code + (sourceMap ? ("\n//# sourceMappingURL=" + fileJS + ".map") : ""));
            fs.writeFileSync(dst + "/"+fileJS+".map", sourceMap ? result.map.toString() : "");
        });
    });
}

gulp.task("copy", function() { // gulp impose d'utiliser une function, et pas une arrow-function.
    if( !fs.existsSync(dst) )
        fs.mkdirSync(dst);

    ["index.html"].map( file => {
        fs.writeFileSync(dst + "/"+file, fs.readFileSync(src + "/" + file));
    });
});

gulp.task("start", ["copy"], function() {
    return Promise.all([
        bundle("index.ts", "index.js", true)
	]);
});