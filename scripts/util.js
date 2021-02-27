const glob = require('glob')
const path = require('path')
const fs = require('fs')
const grayMatter = require('gray-matter')

const pagesDirpath = path.join(__dirname, '..', 'docs')

/**
 * @returns {string[]} - filenames
 */
exports.getDocFilenames = function getDocFilenames() {
  return glob.sync('**/*.@(md|mdx)', { cwd: pagesDirpath, absolute: false })
}

/**
 * A file content parses with gray-matter
 *
 * @param {string} filename
 * @returns {filePath: string; {data: {title: string}; content: string}}
 */
exports.parseFileContents = function parseFileContents(filename) {
  const fileContents = fs.readFileSync(path.join(pagesDirpath, filename))
  return { ...grayMatter(fileContents), filePath: filename }
}

/**
 * Predicate for Guide
 *
 * @param {{filePath: string}} filenames
 * @param {boolean}
 */
exports.isGuide = function isGuide({ filePath }) {
  return true
}
