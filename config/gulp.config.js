/**
 * Configuration
 */
module.exports = {
	sassSrc: './client/app/styles/**/*.scss',
	typescriptSrc: ['./client/app/**/*.ts', './typings/**/*.ts'],

	vendorJsLibs: {
		nodeModulesRoot: './node_modules/',
		dev: [
			{ path: './node_modules/@angular/common/bundles/common.umd.js', singleFile: true, dest: '@angular' },
			{ path: './node_modules/@angular/compiler/bundles/compiler.umd.js', singleFile: true, dest: '@angular' },
			{ path: './node_modules/@angular/core/bundles/core.umd.js', singleFile: true, dest: '@angular' },
			{ path: './node_modules/@angular/forms/bundles/forms.umd.js', singleFile: true, dest: '@angular' },
			{ path: './node_modules/@angular/http/bundles/http.umd.js', singleFile: true, dest: '@angular' },
			{ path: './node_modules/@angular/platform-browser/bundles/platform-browser.umd.js', singleFile: true, dest: '@angular' },
			{ path: './node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js', singleFile: true, dest: '@angular' },
			{ path: './node_modules/@angular/router/bundles/router.umd.js', singleFile: true, dest: '@angular' },

			{ path: './node_modules/@angular/common/bundles/common-testing.umd.js', singleFile: true, dest: '@angular' },
			{ path: './node_modules/@angular/compiler/bundles/compiler-testing.umd.js', singleFile: true, dest: '@angular' },
			{ path: './node_modules/@angular/core/bundles/core-testing.umd.js', singleFile: true, dest: '@angular' },
			{ path: './node_modules/@angular/http/bundles/http-testing.umd.js', singleFile: true, dest: '@angular' },
			{ path: './node_modules/@angular/platform-browser/bundles/platform-browser-testing.umd.js', singleFile: true, dest: '@angular' },
			{ path: './node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js', singleFile: true, dest: '@angular' },
			{ path: './node_modules/@angular/router/bundles/router-testing.umd.js', singleFile: true, dest: '@angular' },

			{ path: './node_modules/systemjs/dist/system.src.js', singleFile: true },
			{ path: './node_modules/systemjs/dist/system-polyfills.js', singleFile: true },
			{ path: './node_modules/core-js/client/shim.min.js', singleFile: true },
			{ path: './node_modules/zone.js/dist/zone.js', singleFile: true },
			{ path: './node_modules/zone.js/dist/long-stack-trace-zone.js', singleFile: true },
			{ path: './node_modules/reflect-metadata/Reflect.js', singleFile: true },
			{ path: './node_modules/rxjs/**/*.js', singleFile: false }
		],
		prod: [
			'./node_modules/core-js/client/shim.min.js',
			'./node_modules/zone.js/dist/zone.min.js',
			'./node_modules/zone.js/dist/long-stack-trace-zone.min.js'
		]
	},

	dev: {
		cleanSrc: './client/src/vendor/node_modules/*',
		sassDest: './client/app/styles',
		typescriptDest: './client/app',
		tslintDest: './client/app/**/*.ts',
		vendorJsDest: './client/src/vendor/node_modules',

		separateDest: {
			appDest: './app-dev',
			sassDest: './app-dev/styles',
			typescriptDest: './app-dev/client',
			staticSrc: [
                './*.html',
                './systemjs.config.js',
                './client/**/*.js*',
                './client/**/*.css',
                './client/**/*.html'
			],
			serverRoot: './app-dev',
			serverFallback: './app-dev/index.html'
		},

		serverRoot: './',
		serverFallback: './index.html',
		serverFileWatchers: {
			all: [
				'./client/app/assets/*',
				'./client/app/**/*.css',
				'./client/app/**/*.js',
                './client/app/**/*.ts',
				'./client/app/**/*.html'
			],
			watchCompile: [
				'./client/app/assets/*',
				'./client/app/*.js*',
				'./client/app/**/*.html'
			]
		}
	},
	prod: {
		cleanSrc: './dist/*',
		sassDest: './dist/styles',
		vendorJsDest: './dist/src',
		aotTempDest: './app-aot',

		appAotDest: 'app.aot.js', 
		appBundleDest: 'app.min.js',
		vendorBundleDest: 'vendor.min.js',

		htmlSrc: './index.html',
		htmlDest: './dist',

		staticBase: './client/app',
		staticSrc: [
			'./app/assets/**/*'
		],
		staticDest: './dist',

		vendorCssSrc: [
			'./app/styles/vendor/coresheet.min.css'
		],
		vendorCssOutFile: 'vendor.css',
		vendorCssDest: './dist/styles',
		vendorCssCleanDest: './dist/styles/components',

		serverRoot: './dist',
		serverFallback: './dist/index.html'
	}
};
