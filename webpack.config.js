const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	devtool: 'inline-source-map',
	devServer: {
		static: './docs',
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'docs'),
		clean: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Weather-App',
			template: 'src/index.html',
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
	watchOptions: {
		ignored: /node_modules/,
	},
};
