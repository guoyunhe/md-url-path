# Changelog

## [2.0.0] - 2026-11-15

### Changed

- Rewrite `.mdx` paths in addition to `.md` paths.
- Drop locale suffixes such as `.ja.md` or `.zh-CN.md`, so links stay inside the
  current locale route prefix.

### Fixed

- Only `README` paths keep a trailing slash. Other paths no longer gain one,
  which broke relative link resolution.

## [1.0.0] - 2026-10-29

### Added

- Add `markdownPathToUrlPath` to convert Markdown file paths to clean URL paths.
- Map `README.md` to its containing directory and other Markdown files to
  extensionless directory URLs.
- Preserve hash fragments and leave absolute URLs and non-Markdown paths
  unchanged.
- Add TypeScript declaration exports.
- Document usage with `remark-link-rewrite`.
