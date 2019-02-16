module.exports = function (api) {

	api.cache(true);

	const presets = [
		"@babel/preset-env"
	];
	
	const plugins = [
		[
			"module-resolver", {
				"root": [
					"./src/app"
				],
				"alias": {
					"bin": "./src/bin",
					"config": "./src/app/config",
					"model": "./src/app/models",
					"controller": "./src/app/http/controllers",
					"middleware": "./src/app/http/middlewares",
					"route": "./src/app/http/routes",
					"locale": "./src/app/locales",
					"log": "./src/app/logs",
					"library": "./src/app/libraries",
					"helper": "./src/app/helpers",
					"view": "./src/app/views",
					"app": "./src/app/index",
					"env": "./src/app/env",
					"events": "./src/app/events",
					"loader": "./src/app/loader",
					"router": "./src/app/libraries/router",
					"routes": "./src/app/http/router",
					"www": "./src/bin/www",
					"server": "./src/bin/server"
				}
			}
		],
			
		[
			"@babel/plugin-transform-runtime"
		]

	];

	return {
		presets,
		plugins
	};
}
