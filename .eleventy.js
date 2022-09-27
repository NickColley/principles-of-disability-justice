const unified = require("unified");
const parse = require("remark-parse");
const slug = require("remark-slug");
const rehype = require("remark-rehype");
const format = require("rehype-format");
const stringify = require("rehype-stringify");
const visit = require("unist-util-visit");

const { GITHUB_REPOSITORY } = process.env;

async function markdown(markdown) {
  const output = await unified()
    // Turn Markdown text into Markdown syntax tree
    .use(parse)
    // Apply Markdown specific transforms
    .use(slug)
    // Turn Markdown into HTML syntax tree
    .use(rehype)
    // Apply HTML specific transforms
    .use(format, { indent: "\t" })
    // Turn HTML syntax tree into HTML text
    .use(stringify)
    .process(markdown);

  return String(output);
}

let pathPrefix = "/";
if (GITHUB_REPOSITORY) {
  const [GITHUB_REPOSITORY_OWNER, GITHUB_REPOSITORY_NAME] =
    GITHUB_REPOSITORY.split("/");
  pathPrefix = `/${GITHUB_REPOSITORY_NAME}/`;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary("md", {
    render: (content) => markdown(content),
  });
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  return {
    dir: {
      layouts: "../layouts",
      input: "./pages",
    },
    pathPrefix,
  };
};
