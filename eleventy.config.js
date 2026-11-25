import yaml from "js-yaml";

export default function (eleventyConfig) {
  // Lets src/_data/thisWeek.yml (the weekly update file) be plain YAML.
  eleventyConfig.addDataExtension("yml,yaml", (contents) => yaml.load(contents));

  // Fonts, images and the stylesheet are copied as they are.
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

  // Zero-pads a number: 1 becomes "01".
  eleventyConfig.addFilter("pad2", (n) => String(n).padStart(2, "0"));

  return {
    dir: {
      input: "src",
      output: "_site",
    },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
  };
}
