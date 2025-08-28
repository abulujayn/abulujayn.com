const moment = require("moment-hijri")
moment.locale("en-us")
const htmlmin = require("html-minifier-terser")

module.exports = function(eleventyConfig) {
    eleventyConfig.addNunjucksGlobal("llh", "الله")
    eleventyConfig.addNunjucksGlobal("bsmllh", "بسم الله الرحمن الرحيم")
    eleventyConfig.addNunjucksGlobal("nshllh", "إن شاء الله")
    eleventyConfig.addNunjucksGlobal("llhkbr", "الله أكبر")
    eleventyConfig.addNunjucksGlobal("lhmdlllh", "الحمد لله")
    eleventyConfig.addNunjucksGlobal("sbhnllh", "سبحان الله")
    eleventyConfig.addNunjucksGlobal("sllhlhwsllm-f", "صلى الله عليه وسلم")
    eleventyConfig.addNunjucksGlobal("sllhlhwsllm", "ﷺ")

    eleventyConfig.addFilter("filterTags", function(tags) {
        return (tags || []).filter(tag => !["posts", "dunyā", "dīn"].includes(tag))
    })
    eleventyConfig.addFilter("tagsOnly", function(tags) {
        return (tags || []).filter(tag => !["posts", "all"].includes(tag))
    })
    eleventyConfig.addFilter("getKeys", function(obj) {
        return Object.keys(obj || {})
    })
    eleventyConfig.addFilter("uniq", function(arr) {
        return [...new Set(arr || [])]
    })
    eleventyConfig.addFilter("date", function(rawDate) {
        const date = moment(rawDate)
        const year = date.year()
        const month = date.month() + 1
        const day = date.date()
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    })
    eleventyConfig.addFilter("hijri", function(rawDate, date_shift) {
        const date = moment(rawDate)
        date.add(date_shift || 0, 'iDate')
        const year = date.iYear()
        const month = date.iMonth() + 1
        const day = date.iDate()
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    })

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