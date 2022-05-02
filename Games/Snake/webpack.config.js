const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
	//指定入口文件
	entry: "./src/index.ts",

	//指定打包文件输出位置
	output: {
		//指定打包文件目录
		path: path.resolve(__dirname, 'dist'),
		//打包后的文件名字
		filename: "bundle.js"
	},

	mode: 'development', 

	//指定webpack打包时使用的模块
	module: {
		//指定loader的规则
		rules: [
			{
				//test指定的是规则生效的文件
				test: /\.ts$/,
				//要使用的loader
				use: [
					//配置babel
					{
						//指定加载器
						loader: "babel-loader",
						//配置babel
						options: {
							// 设置预置环境
							presets: [
								[
									//指定环境的插件
									"@babel/preset-env",
									// 配置信息
									{
										targets: {
											//需要兼容的浏览器
											"chrome": "92"
										},
										// 指定corejs的版本
										"corejs": "3",
										// 使用corejs的方式 "usage"(按需加载)
										"useBuiltIns": "usage"
									}
								]
							]
						}
					},
							'ts-loader'],
				//要排除的文件
				exclude: /node_modules/
			},

			//设置less文件的处理
			{
				test: /.less$/,
				use: [
					"style-loader",
					"css-loader",
					//引入postcss
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									[
										"postcss-preset-env",
										{
											browsers: 'last 2 versions'
										}
									]
								]
							}
						}
					},
					"less-loader"
				]
			}
		]
	},

	//配置webpack的插件
	plugins: [
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({
			template: "./src/index.html"
		})
	],

	resolve: {
		extensions: ['.js', '.ts']
	}
}
