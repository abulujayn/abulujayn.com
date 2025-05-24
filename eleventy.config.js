const moment = require("moment")
const htmlmin = require("html-minifier-terser")

module.exports = function(eleventyConfig) {
    eleventyConfig.addFilter("date", function(date) {
        return moment(date).format("YYYY-MM-DD")
    })

    eleventyConfig.addNunjucksGlobal("llh", "الله")
    eleventyConfig.addNunjucksGlobal("bsmllh", "بسم الله الرحمن الرحيم")
    eleventyConfig.addNunjucksGlobal("nshllh", "إن شاء الله")
    eleventyConfig.addNunjucksGlobal("llhkbr", "الله أكبر")
    eleventyConfig.addNunjucksGlobal("llhmdlllh", "الحمد لله")
    eleventyConfig.addNunjucksGlobal("sbhnllh", "سبحان الله")

    eleventyConfig.addTransform("htmlmin", function (content) {
		if ((this.page.outputPath || "").endsWith(".html")) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
			});

			return minified;
		}

		return content;
	});
}

module.exports.config = {
    dir: {
        input: "content",
        includes: "../_includes"
    },
    markdownTemplateEngine: "njk"
}