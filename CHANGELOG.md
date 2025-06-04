# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [1.0.1] - 2025-06-04

### Fixed
- Ensure `uploads/` folder is automatically created before `multer` stores any file.
  - Prevents server crash when the folder doesn't exist.
  - Uses `fs.existsSync` and `fs.mkdirSync(..., { recursive: true })` before multer storage initialization.

### Changed
- Refactored multer destination setup to use centralized `uploadDir` constant.


## [1.0.0] - 2025-06-04

### Added
- Initial release of Ikat Digital
- Upload files up to 50 GB without login
- Auto delete after 1 download or expiration time (30m–30d)
- Basic analytics via IP, UA, etc
- Download tracking
- SEO-optimized landing page
- Dark theme UI with Bootstrap 5
- File metadata logged even after deletion
- Manual disclaimer page for legal protection
- Success screen with copy-to-clipboard link
- Cron job to remove expired files (from disk only)

### Fixed
- Graceful error pages for expired, deleted, or missing files

### Removed
- Nothing yet

---
