const fs = require('fs');
const moment = require('moment');
const yamlFront = require('yaml-front-matter');

const sortDelimiter = ';';

/**
 * Generate sidebar array
 * @param {array} markdownPaths contains an array list of file paths
 * @param {bool} sort sort the output array by 'date' in YAML header descendantly or not
 * @param {int} limit limit the returned results, 0 will return all results
 */
function generateSidebar(markdownPaths, sort = true, limit = 0) {
  let renderedPosts = new Array();

  if (sort) {
    markdownPaths.forEach(filePath => {
      fileContents = fs.readFileSync(filePath, 'utf8').toString();
      fileMeta = yamlFront.loadFront(fileContents);
      if (fileMeta.blog_index == true) return;
      fileTimestamp = moment(fileMeta.date);
      renderedPosts.push(fileTimestamp + sortDelimiter + filePath);
    });
    renderedPosts = renderedPosts.sort().reverse();
    if (limit > 0) {
      renderedPosts = renderedPosts.slice(0, limit);
    }
    renderedPosts.forEach((sortedPath, index, array) => {
      array[index] =
        sortedPath.substring(
          sortedPath.indexOf(sortDelimiter) + sortDelimiter.length + basePath.length,
          sortedPath.lastIndexOf('/')
        ) + '/';
    });
  } else {
    renderedPosts = markdownPaths.map(
      filePath => filePath.substring(basePath.length, filePath.lastIndexOf('/')) + '/'
    );
  }

  return renderedPosts;
}

const glob = require('glob');
const basePath = 'docs';
let blogPaths = glob.sync(basePath + '/*/*.md');
let blogPosts = generateSidebar(blogPaths, true, 5);

module.exports = {
  title: 'Jerexyz',
  description: '.....',
  dest: 'pages',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog.html' },
    ],
    // Assumes GitHub. Can also be a full GitLab url.
    repo: '/jerexyz/jerexyz.github.io',
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    repoLabel: 'Contribute!',

    // Optional options for generating "Edit this page" link

    // if your docs are in a different repo from your main project:
    docsRepo: '/jerexyz/jerexyz.github.io',
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Help us improve this page!',
  },
  plugins: {},
  markdown: {
    extendMarkdown: md => {
      // 使用更多的 markdown-it 插件!
      md.use(require('markdown-it-plantuml'));
    },
  },
};
