# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [2.0.0] - 2025-06-04

# ✨ What's new in v2.0.0

## Added
- 🌀 Loading indicator when uploading a file to give users clear visual feedback during the upload process.
- ⛔ "Send File" button is now disabled immediately upon submission to prevent multiple clicks.
- 📢 Display message "Uploading file, please wait..." during upload for improved clarity.

## Changed
- Updated upload form layout to include a loading spinner and manage submit button state dynamically.

## Why it matters
- Significantly improves user experience (UX), especially when uploading large files or using slower internet connections.
- Prevents duplicate submissions and provides clear communication during the upload process.

---

ℹ️ Note:
This version only includes frontend enhancements. No changes were made to backend logic or database structure.

## [1.1.0] - 2025-06-04

Version 1.1.0 – English UI Latest

✨ What's new in v1.1.0

🌐 Full English translation for all public-facing pages
✅ Improved copy-to-clipboard feedback
🎯 Minor layout and content adjustments


## [1.0.3] - 2025-06-04

### Added
- `.sequelizerc` file is now tracked by Git to ensure Sequelize CLI works with the custom folder structure.
- Added `db:reset` script: drops, creates, and runs all migrations with a single command.
- Ignored `uploads/` in `nodemon` to prevent unnecessary restarts during development.

### Fixed
- Automatically create `uploads/` folder if missing to prevent multer-related server errors.

### Changed
- Bumped project version to `1.0.3` in `package.json`.


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
