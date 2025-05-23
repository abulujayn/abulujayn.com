const moment = require("moment")

module.exports = function(eleventyConfig) {
    eleventyConfig.setInputDirectory("content")
    eleventyConfig.setIncludesDirectory("../_includes")

    eleventyConfig.addFilter("date", function(date) {
        return moment(date).format("YYYY-MM-DD")
    })
}