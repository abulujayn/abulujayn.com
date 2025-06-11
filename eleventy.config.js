const hijri = require("moment-hijri")
hijri.locale("en-us")
const htmlmin = require("html-minifier-terser")

module.exports = function(eleventyConfig) {
    eleventyConfig.addNunjucksGlobal("llh", "الله")
    eleventyConfig.addNunjucksGlobal("bsmllh", "بسم الله الرحمن الرحيم")
    eleventyConfig.addNunjucksGlobal("nshllh", "إن شاء الله")
    eleventyConfig.addNunjucksGlobal("llhkbr", "الله أكبر")
    eleventyConfig.addNunjucksGlobal("llhmdlllh", "الحمد لله")
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
    eleventyConfig.addFilter("date", function(date) {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    })
    eleventyConfig.addFilter("hijri", function(data) {
        const date = hijri(data.date)
        const year = date.iYear()
        const month = date.iMonth() + 1
        let day = date.iDate()
        if (data.date_shift) {
            day += data.date_shift
        }
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