# How to work

All files for production are compiled with [Gulp]. CSS compiled with [PostCSS]. JavaScript libs and plugins are concatenated to the single file. Images are optimized and SVG compiled to SVG-sprite. HTML just copied.

## Setup

1. Install [Node.js].
2. Install development modules:

		$ npm install

3. Run `npm run build`.

## Folders structure

`root` — configs and dependencies.

`dist` — destination directory. There would be generated assets. Shouldn't be in repository.

`src` — source directory for everything:

* dev root — HTML.
* `img` — images.
	* `img/svg-sprite` — SVGs for SVG-sprite.
	* `img/temp` — temporary images. They don't go to production and for demonstration purpose only.
* `js` — JavaScript.
* `pcss` — PostCSS files.

## Generate assets

Start watching service which generates _dev_ version on each source file change, also this start local webserver with autoreload:

	$ npm start

Generate _production_ (minified and optimized) version:

	$ npm run build

[Gulp]: https://gulpjs.com/
[PostCSS]: https://postcss.org/
[Node.js]: https://nodejs.org/
