const { GITHUB_REPOSITORY } = process.env;

const [GITHUB_REPOSITORY_OWNER, GITHUB_REPOSITORY_NAME] =
  GITHUB_REPOSITORY.split("/");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  return {
    dir: {
      layouts: "../layouts",
      input: "./pages",
    },
    pathPrefix: `/${GITHUB_REPOSITORY_NAME}/`,
  };
};
