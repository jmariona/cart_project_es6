const path = require('path');
const webpack = require('webpack');
/** ****Plugins****** */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlwepackPlugin = require('html-webpack-plugin');

/** ***End Plugins** */

/** ****Options webpack-images-plugin****** */
const _optionsWebpackLoader = {
	bypassOnDebug: true,
	disable: true,
	mozjpeg: {
		progressive: true,
		quality: 65
	},

	optipng: {
		enabled: true
	},

	pngquant: {
		quality: '65-90',
		speed: 4
	},

	gifsicle: {
		interlaced: false
	},
	webp: {
		quality: 75
	}
};
/** ****End****** */

/** ****Options file-loader****** */
const _optionsFileLoader = {
	name: '[name].[ext]',
	outputPath: 'img/',
	publicPath: '../img'
};
/** ****End****** */

/** ****Watcher****** */

const watch = true;
/** ****End****** */

/** ****Mode webpack****** */
const mode = 'development';
/** ****End****** */

/** ****Mode webpack****** */
const entry = {
	index: ['./src/js/build.js', './src/sass/build.scss']
};
/** ****End****** */

/** ****Output****** */
const output = {
	path: path.join(__dirname, './dist'),
	filename: './js/bundle.js'
};
/** ****End****** */

/** *******Modules*********** */
const _module = {
	rules: [
		{
			test: /\.m?js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			}
		},

		{
			test: /\.scss$/,
			exclude: /node_modules/,
			use: [
				'style-loader',
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader',
				'resolve-url-loader',
				'sass-loader'
			]
		},

		{
			test: /\.(gif|png|jpe?g|svg)$/i,
			use: [
				{
					loader: 'file-loader',
					options: _optionsFileLoader
				},

				{
					loader: 'image-webpack-loader',
					options: _optionsWebpackLoader
				}
			]
		},

		{
			test: /\.ejs$/,
			loader: 'ejs-webpack-loader',
			exclude: /node_modules/
		},

		{
			test: /\.html$/,
			use: [
				{
					loader: 'html-loader',
					options: { minimize: true }
				}
			]
		}
	]
};
/** *********************** */

/** ********Plugins******** */
const plugins = [
	new webpack.LoaderOptionsPlugin({
		options: {
			postcss: [autoprefixer()]
		}
	}),

	new MiniCssExtractPlugin({
		filename: '/css/bundle.css'
	}),

	new BrowserSyncPlugin({
		host: 'localhost',
		port: 4000,
		server: {
			baseDir: ['dist']
		}
	}),

	new HtmlwepackPlugin({
		template: 'src/views/index.ejs',
		inject: false,
		filename: 'index.html',
		chunks: ['js'],
		minify: {
			html5: true,
			collapseWhitespace: true,
			caseSensitive: true,
			removeComments: true
		}
	})
];
/** *********************** */

module.exports = {
	mode,
	entry,
	output,
	module: _module,
	plugins,
	watch
};
