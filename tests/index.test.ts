import { describe, expect, test } from 'vitest';

import { markdownPathToUrlPath } from '../src';

describe('markdownPathToUrlPath', () => {
  test('maps README.md to its containing directory', () => {
    expect(markdownPathToUrlPath('./docs/README.md')).toBe('./docs/');
  });

  test('maps other Markdown files to extensionless directory URLs', () => {
    expect(markdownPathToUrlPath('./docs/getting-started.md')).toBe('./docs/getting-started/');
  });

  test('maps a root README.md to the current directory', () => {
    expect(markdownPathToUrlPath('README.md')).toBe('./');
  });

  test('preserves hash fragments on README.md paths', () => {
    expect(markdownPathToUrlPath('./docs/README.md#installation')).toBe('./docs/#installation');
  });

  test('preserves hash fragments on other Markdown paths', () => {
    expect(markdownPathToUrlPath('./docs/getting-started.md#setup')).toBe(
      './docs/getting-started/#setup',
    );
  });

  test('leaves non-Markdown paths unchanged', () => {
    expect(markdownPathToUrlPath('./docs/image.png')).toBe('./docs/image.png');
  });

  test('leaves absolute URLs unchanged', () => {
    const url = 'https://github.com/guoyunhe/md-url-path/blob/main/README.md';
    expect(markdownPathToUrlPath(url)).toBe(url);
  });
});
