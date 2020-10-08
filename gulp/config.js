import autoprefixer from 'autoprefixer';
import c from 'ansi-colors';
import yargs from 'yargs';

const argv = yargs.argv;
const production = !!argv.production;

const paths = {
	dist: './dist/',
	views: {
		src: './src/pages/**/*.{html,hbs,handlebars}',
		pages: './src/pages/',
		layouts: './src/layouts/',
		partials: './src/partials/',
		data: './src/data/',
		helpers: './src/helpers/',
		dist: './dist/',
		watch: './src/pages/**/*.{html,hbs,handlebars}',
		refresh: './src/{layouts,partials,helpers,data}/**/*',
	},
	styles: {
		src: './src/assets/styles/main.{scss,sass}',
		dist: './dist/assets/styles/',
		watch: './src/assets/styles/**/*.{scss,sass}',
	},
	images: {
		src: './src/assets/images/**/*.{jpg,jpeg,png,gif,svg}',
		dist: './dist/assets/images/',
		watch: './src/assets/images/**/*.{jpg,jpeg,png,gif,svg}',
	},
	assets: {
		src: [
			'./src/assets/**',
			'!./src/assets/scripts/**',
			'!./src/assets/styles/**',
			'!./src/assets/images/**',
		],
		dist: './dist/assets/',
		watch: [
			'./src/assets/**',
			'!./src/assets/scripts/**',
			'!./src/assets/styles/**',
			'!./src/assets/images/**',
		],
	},
	scripts: {
		src: './src/assets/scripts/main.js',
		dist: './dist/assets/scripts/',
		watch: './src/assets/scripts/**/*.js',
	},
};

const sass = {
	includePaths: ['node_modules'],
};

const postcss = [
		autoprefixer(),
];

const webpack = {
	entry: {
		main: paths.scripts.src,
	},
	output: {
		filename: '[name].js',
		chunkFilename: "[name].js",
	},
	mode: production ? 'production' : 'development',
	devtool: production ? false : 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: require.resolve('babel-loader'),
					options: {
						presets: [
							['@babel/preset-env', { modules: false }],
						],
					},
				},
			},
		],
	},
};

const plumber = {
	errorHandler: function(err) {
		console.log(c.red(err.message));
		this.emit('end');
	}
};

const server = {
	port: 4000,
};

const config = {
	sass,
	postcss,
	webpack,
	plumber,
	server,
};

export { paths, config, production };