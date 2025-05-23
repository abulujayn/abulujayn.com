const moment = require("moment")

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
}

module.exports.config = {
    dir: {
        input: "content",
        includes: "../_includes"
    },
    markdownTemplateEngine: "njk"
}