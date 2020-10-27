const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
	mode: "development",
	entry: {
		index: "./Client/index.js",
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].js",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					cacheDirectory: true,
					configFile: "./Client/.babelrc",
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
					},
				],
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|svg|jpg|gif|ico)$/,
				use: ["file-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./Client/pages/indexPage/index.html",
			filename: "./index.html",
		}),
		new CleanWebpackPlugin({
			cleanAfterEveryBuildPatterns: ["dist"],
		}),
	],
	optimization: {},
	resolve: {
		modules: ["node_modules"],
		extensions: [".js", ".json", ".jsx", ".css"],
	},
};
