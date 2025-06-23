# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).


## [2.2.0] - 2025-06-23

# 📚 What's new in v2.2.0

## Added

* 📖 **Developer Documentation**:

  * Added `CONTRIBUTING.md` with full setup, testing, and contribution guide
  * Added `CONVENTION.md` to standardize code structure, naming, git commits, and style
  * Added `SECURITY.md` to document responsible vulnerability reporting
  * Added `CODE_OF_CONDUCT.md` to define respectful community behavior
  * Added GitHub issue and PR templates under `.github/`

* 🛠 **Prettier & EditorConfig Setup**:

  * Added `.prettierrc`, `.prettierignore`, and `.editorconfig` for unified code formatting across all editors
  * Introduced `npm run format` script using Prettier

## Changed

* 🗂 Cleaned and restructured documentation files for clarity and contribution readiness
* 🔄 Updated `package.json`:

  * Added `prettier` to `devDependencies`
  * Added `format` script for automatic code formatting

## 👥 Contributors

* Thanks to [@liu-purnomo](https://github.com/liu-purnomo) for preparing comprehensive community standards and automation tooling

## ⚠️ Developer Note

> Don't forget to install Prettier dependencies after pulling this version:

```bash
npm install
```

Then to format your code:

```bash
npm run format
```

## [2.1.0] - 2025-06-23

# 🔐 What's new in v2.1.0

## Added

- 🔑 **Password Protection**: Users can now optionally protect their uploaded files with a password. Downloaders must enter the correct password to access the file.
- 📱 **QR Code Support**: Each upload generates a scannable QR code linking directly to the download page.
- 📤 **Share Buttons**: New buttons for **WhatsApp**, **Email**, and **Telegram** make it easier to share file links.

## Changed

- 💾 **Database Schema**:
  - Added `password` column to the `Files` table to support password-protected downloads.

- 🧩 Refined download flow to handle password prompts, validation, and errors gracefully.
- ✨ Improved UI/UX on upload and download pages to support new features and better user feedback.

## 👥 Contributors

- Special thanks to [@mdwisu](https://github.com/mdwisu) for proposing the idea of **password protection**, **QR code support**, and for contributing to the **UI/UX enhancements**.
- Shout-out to [@findrakecil](https://github.com/findrakecil) for improving the **developer documentation**, making it easier to set up the project and copy the `.env.example` file correctly.

## ⚠️ Developer Note

> This update introduces a **new database column (`password`)** in the `Files` table.
> Please remember to run the migration:

```bash
npm run db:migrate
```

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
