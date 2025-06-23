# 🧭 Ikat Digital – Code Conventions & Best Practices

> 📘 This document complements [CONTRIBUTING.md](./CONTRIBUTING.md).  
> It outlines the **code style, naming conventions, folder structure**, and **best practices** used across the Ikat Digital project.

Please follow these standards to maintain code readability and consistency.

---

## 📁 Folder Structure

All source code lives under the `src/` directory.

```

src/
├── app.js             # Entry point
├── routes/            # Express route definitions
├── controllers/       # Route logic handlers
├── views/             # EJS templates
├── db/                # DB models, migrations, config
│   ├── models/
│   ├── migrations/
│   ├── seeders/
│   └── database.js
└── jobs/              # Scheduled tasks (e.g., cleanup)

```

---

## 📌 Naming Conventions

### JavaScript/Node Variables

- `camelCase` for variables and function names
- `UPPER_SNAKE_CASE` for constants

```js
const fileToken = req.params.token;
const MAX_FILE_SIZE = 50 * 1024 * 1024 * 1024; // 50GB
```

### Files & Folders

- Use `kebab-case` for filenames and folders
- Examples:
  - `upload-controller.js`
  - `clean-expired-files.js`

---

## 🗃 Database (Sequelize / PostgreSQL)

### Tables

- Use `PascalCase`, plural
- Example: `Files`, `Downloads`

### Columns

- Use `camelCase`, descriptive
- Example: `fileName`, `expiresAt`, `recipientEmail`

### Models

- Use `PascalCase`, singular
- Example: `File`, `Download`

### Relationships

- Use foreign key naming like: `fileId`, `userId`

---

## 📄 EJS View Templates

- Located in `src/views`
- Use `kebab-case` filenames: `landing.ejs`, `upload-success.ejs`
- Keep logic minimal — use controller to prepare data

---

## 📜 Git Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

### Format:

```
<type>(scope): <short description>
```

### Types:

- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code restructure (no behavior change)
- `style`: Formatting (no logic change)
- `docs`: Documentation only
- `test`: Adding/modifying tests
- `chore`: Tooling, build, dependencies

### Examples:

```
feat(upload): support password-protected files
fix(download): prevent expired file access
docs(readme): add project description
```

---

## 🧪 Testing (Coming Soon)

- Place tests in `/test` folder
- Filename format: `upload.test.js`
- Testing tool: [Jest](https://jestjs.io/)

---

## 🌐 URL Structure

- `/` – Landing page
- `/upload` – Upload form
- `/d/:token` – Download by token
- `/disclaimer` – Legal info

---

## 📦 Environment Variables (`.env`)

Use `UPPER_SNAKE_CASE` for all keys:

```env
DB_USERNAME=postgres
DB_PASSWORD=secret
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=ikat_digital
BASE_URL=https://ikat.id
```

---

## 🧼 Cron Jobs & Cleanup

- Place scheduled jobs in `src/jobs`
- Use naming: `clean-expired-files.js`
- Trigger with `node-cron` via `app.js` or `jobs/index.js`

---

## ✅ Final Notes

Consistency is clarity.
Thanks for helping maintain code quality in **Ikat Digital** 💙
