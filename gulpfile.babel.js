import autoprefixer from "autoprefixer";
import browserSync from "browser-sync";
import cssnano from "cssnano";
import { dest, series, src, task, watch } from "gulp";
import postcss from "gulp-postcss";
import purgecss from "@fullhuman/postcss-purgecss";
import atimport from "postcss-import";
import tailwindcss from "tailwindcss";
import concat from "gulp-concat";
import terser from "gulp-terser";

const SITE_ROOT = "./_site";
const POST_BUILD_STYLESHEET = `${SITE_ROOT}/assets/css/`;
const PRE_BUILD_STYLESHEET = "./_assets/css/style.css";
const TAILWIND_CONFIG = "./tailwind.config.js";
const PRE_BUILD_SCRIPT = "./_assets/js/**/*.js";
const POST_BUILD_SCRIPT = `${SITE_ROOT}/assets/js/`;
const PRE_BUILD_IMAGES = "./_assets/img/**";
const POST_BUILD_IMAGES = `${SITE_ROOT}/assets/img/`;

// Fix for Windows compatibility
const isWindowsPlatform = process.platform === "win32";
const jekyll = isWindowsPlatform ? "jekyll.bat" : "jekyll";
const spawn = isWindowsPlatform
  ? require("win-spawn")
  : require("child_process").spawn;

const isDevelopmentBuild = process.env.NODE_ENV === "development";

// Custom PurgeCSS Extractor for Tailwind CSS
const purgeForTailwind = content => content.match(/[\w-/:]+(?<!:)/g) || [];

task("buildJekyll", () => {
  browserSync.notify("Building Jekyll site...");

  const args = ["exec", jekyll, "build"];

  if (isDevelopmentBuild) {
    args.push("--incremental");
  }

  return spawn("bundle", args, { stdio: "inherit" });
});

// styles task inc tailwind
task("processStyles", () => {
  browserSync.notify("Compiling Styles...");

  return src(PRE_BUILD_STYLESHEET)
    .pipe(
      postcss([
        atimport(),
        tailwindcss(TAILWIND_CONFIG),
        ...(!isDevelopmentBuild
          ? [
            purgecss({
              content: [`${SITE_ROOT}/**/*.html`],
              defaultExtractor: purgeForTailwind
            }),
            autoprefixer(),
            cssnano()
          ]
          : [])
      ])
    )
    .pipe(dest(POST_BUILD_STYLESHEET));
});

// JS task
task("processScripts", () => {
  browserSync.notify("Compiling Scripts...");

  return src(PRE_BUILD_SCRIPT)
    .pipe(concat('main.js'))
    .pipe(terser())
    .pipe(dest(POST_BUILD_SCRIPT))
})

// Images task
task("processImages", () => {
  browserSync.notify("Processing Images...");

  return src(PRE_BUILD_IMAGES)
    .pipe(dest(POST_BUILD_IMAGES))
})

task("startServer", () => {
  browserSync.init({
    files: [SITE_ROOT + "/**"],
    open: "local",
    port: 4000,
    server: {
      baseDir: SITE_ROOT,
      serveStaticOptions: {
        extensions: ["html"]
      }
    }
  });

  watch(
    [
      "**/*.css",
      "**/*.html",
      "**/*.js",
      "**/*.md",
      "**/*.markdown",
      "!_site/**/*",
      "!node_modules/**/*"
    ],
    { interval: 500 },
    buildSite
  );
});

const buildSite = series("buildJekyll", "processStyles", "processScripts", "processImages");

exports.serve = series(buildSite, "startServer");
exports.default = series(buildSite);
