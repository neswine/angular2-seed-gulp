System.config({
	baseURL: './',
	map: {
		'@angular/core': './client/src/vendor/node_modules/@angular/core.umd.js',
		'@angular/common': './client/src/vendor/node_modules/@angular/common.umd.js',
		'@angular/compiler': './client/src/vendor/node_modules/@angular/compiler.umd.js',
		'@angular/forms': './client/src/vendor/node_modules/@angular/forms.umd.js',
		'@angular/http': './client/src/vendor/node_modules/@angular/http.umd.js',
		'@angular/platform-browser': './client/src/vendor/node_modules/@angular/platform-browser.umd.js',
		'@angular/platform-browser-dynamic': './client/src/vendor/node_modules/@angular/platform-browser-dynamic.umd.js',
		'@angular/router': './client/src/vendor/node_modules/@angular/router.umd.js',
		'rxjs': './client/src/vendor/node_modules/rxjs'
	},
	packages: {
        client: {
            app: {
                'src': {
                    defaultExtension: 'js'
                },
                'rxjs': {
                    defaultExtension: 'js'
                }
            }
        }
	}
});

System.import('./client/app/main.js').catch(function(err) {
	console.error(err);
});