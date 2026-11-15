const absoluteUrlPattern = /^(?:[a-z][a-z\d+.-]*:\/\/|\/\/)/i;
const documentExtensionPattern = /\.(?:md|mdx)$/i;
// Locale suffixes select one translation of a page, e.g. `guide.ja.md` or `guide.zh-CN.md`.
const localeSuffixPattern = /\.[a-z]{2}(?:-[a-z]{2})?$/i;

/**
 * Convert a Markdown or MDX file path into the URL path of the page it becomes.
 *
 * `README` files map to their containing directory, other files keep their name without the
 * extension, and locale suffixes are dropped because the current page already carries the locale
 * prefix of its routes.
 */
export function markdownPathToUrlPath(filePath: string): string {
  // Avoid rewriting absolute and protocol-relative URLs that happen to end in .md.
  if (absoluteUrlPattern.test(filePath)) {
    return filePath;
  }

  // Transform only the file path and append the original fragment afterward.
  const hashIndex = filePath.indexOf('#');
  const path = hashIndex === -1 ? filePath : filePath.slice(0, hashIndex);
  const hash = hashIndex === -1 ? '' : filePath.slice(hashIndex);

  // Leave paths that are not Markdown or MDX files untouched.
  const extension = path.match(documentExtensionPattern)?.[0];
  if (!extension) {
    return filePath;
  }

  const stem = path.slice(0, -extension.length).replace(localeSuffixPattern, '');
  const directoryEnd = stem.lastIndexOf('/') + 1;
  const fileName = stem.slice(directoryEnd);

  // Treat README files as the index page of their containing directory.
  if (fileName.toLowerCase() === 'readme') {
    return `${stem.slice(0, directoryEnd) || './'}${hash}`;
  }

  return `${stem}${hash}`;
}
