# md-url-path

Convert Markdown file paths into clean, directory-style URL paths.

## Install

```sh
npm install md-url-path
```

## Usage

```ts
import { markdownPathToUrlPath } from 'md-url-path';

markdownPathToUrlPath('./docs/README.md');
// './docs/'

markdownPathToUrlPath('./docs/getting-started.md');
// './docs/getting-started/'

markdownPathToUrlPath('./docs/README.md#installation');
// './docs/#installation'

markdownPathToUrlPath('https://github.com/guoyunhe/md-url-path/blob/main/README.md');
// 'https://github.com/guoyunhe/md-url-path/blob/main/README.md'

markdownPathToUrlPath('./docs/image.png');
// './docs/image.png'
```

## Use with remark-link-rewrite

Use [`remark-link-rewrite`](https://www.npmjs.com/package/remark-link-rewrite)
to rewrite Markdown links as part of a Remark processing pipeline:

```sh
npm install md-url-path remark remark-link-rewrite
```

```ts
import { markdownPathToUrlPath } from 'md-url-path';
import { remark } from 'remark';
import remarkLinkRewrite from 'remark-link-rewrite';

const processor = remark().use(remarkLinkRewrite, {
  replacer: (url) => markdownPathToUrlPath(url),
});

const result = await processor.process('[Guide](./docs/getting-started.md)');
console.log(String(result));
// [Guide](./docs/getting-started/)
```

The replacer runs for each link. `markdownPathToUrlPath` transforms Markdown
file paths while leaving absolute URLs and other paths unchanged.
