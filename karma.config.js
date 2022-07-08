const path = require("path");


module.exports = function (config) {
	config.set({
		autoWatch: true,
		singleRun: true,
		plugins: [
			'karma-chrome-launcher',
			'karma-jasmine',
			'karma-sourcemap-loader',
			'karma-webpack',
			'karma-coverage-istanbul-reporter',
			'karma-junit-reporter'
		],
		basePath: '',
		frameworks: ['jasmine', 'webpack'],
		files: [
			'test/**/*.test.ts',
			'test/**/*.test.tsx'

		],
		preprocessors: {
			'test/**/*.test.ts': ['webpack', 'sourcemap'],
			'test/**/*.test.tsx': ['webpack', 'sourcemap']

		},
		browsers: ['ChromeHeadless'],
		reporters: ["progress", 'junit', 'coverage-istanbul'],
		coverageIstanbulReporter: {
			reports: ['html', 'cobertura'],
			dir: path.join(__dirname, 'coverage'),
			fixWebpackSourcePaths: true,
			'report-config': {
				html: { outdir: 'html' }
			},
			// thresholds: {
			// 	emitWarning: false,
			// 	global: {
			// 		statements: 90,
			// 		lines: 90,
			// 		branches: 90,
			// 		functions: 90
			// 	},

			// },
		},
		junitReporter: {
			useBrowserName: false,
			outputFile: 'junit.xml'
		},
		webpack: {
			mode: "development",
			devtool: "inline-source-map",
			plugins: [],
			module: {
				rules: [
					{
						test: /\.tsx?$/,
						use: [
							"@jsdevtools/coverage-istanbul-loader",
						],
						exclude: path.resolve(__dirname, "test"),
					},
					{
						test: /\.tsx?$/,
						use: [
							{
								loader: "ts-loader",
								options: {
									configFile: "tsconfig.karma.json",
									compilerOptions: {
										noEmit: false,
										noEmitOnError: false,
									},
								},
							}

						],
						exclude: "/node_modules",
					}
				],
			},
			watch: true,
			resolve: {
				extensions: [".tsx", ".ts", ".js"]
			},
			output: {
				path: path.resolve(__dirname, "karma-test-dist"),
			}
		}
	});
};