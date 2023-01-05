const HTMLWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const path = require('path')

module.exports = {
	entry: './src/main.js',
	output: {
		filename: 'app.bundle.js',
		path: path.resolve(__dirname, 'public'),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				include: path.resolve(__dirname, 'src'),
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src'),
				use: ['babel-loader'],
			},
		],
	},
	devServer: {
		port: 5900,
	},
	plugins: [
		new HTMLWebPackPlugin({
			template: './src/index.html',
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true,
			},
		}),
		new MiniCssExtractPlugin({
			filename: 'app.bundle.css',
			ignoreOrder: false,
		}),
		new CopyPlugin({
			patterns: [
				{
					from: './src/assets',
					to: './assets',
				},
				{
					from: './src/robots.txt',
					to: '.',
				},
			],
		}),
	],
}
