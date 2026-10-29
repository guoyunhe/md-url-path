# Changelog

## [1.0.0] - 2026-10-29

### Added

- Add `markdownPathToUrlPath` to convert Markdown file paths to clean URL paths.
- Map `README.md` to its containing directory and other Markdown files to
  extensionless directory URLs.
- Preserve hash fragments and leave absolute URLs and non-Markdown paths
  unchanged.
- Add TypeScript declaration exports.
- Document usage with `remark-link-rewrite`.
