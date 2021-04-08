module.exports = {
	css: {
		loaderOptions: {
			sass: {
				data: `@import "@/sass/_variables.scss";`,
			},
		},
	},
	configureWebpack: config => {
		config.devtool = "source-map";
	},
};
