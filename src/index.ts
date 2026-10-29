export function markdownPathToUrlPath(filePath: string): string {
  // Avoid rewriting absolute and protocol-relative URLs that happen to end in .md.
  if (/^(?:[a-z][a-z\d+.-]*:\/\/|\/\/)/i.test(filePath)) {
    return filePath;
  }

  // Transform only the file path and append the original fragment afterward.
  const hashIndex = filePath.indexOf('#');
  const path = hashIndex === -1 ? filePath : filePath.slice(0, hashIndex);
  const hash = hashIndex === -1 ? '' : filePath.slice(hashIndex);

  // Leave paths that are not Markdown files untouched.
  if (!path.toLowerCase().endsWith('.md')) {
    return filePath;
  }

  const fileName = path.slice(path.lastIndexOf('/') + 1);
  // Treat README.md as the index for its containing directory.
  if (fileName.toLowerCase() === 'readme.md') {
    const directoryPath = path.slice(0, path.lastIndexOf('/') + 1);
    return `${directoryPath || './'}${hash}`;
  }

  return `${path.slice(0, -'.md'.length)}/${hash}`;
}
