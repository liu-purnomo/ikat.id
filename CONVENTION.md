
# 🧭 Ikat Digital – Code Conventions & Best Practices

This document defines the **conventions and naming standards** used across the Ikat Digital project. Following this ensures consistency, readability, and maintainability.

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

### Variables (JS/Node)
- `camelCase` for all variables and function names  
- Constants use `UPPER_SNAKE_CASE`

```js
const fileToken = req.params.token;
const MAX_FILE_SIZE = 50 * 1024 * 1024 * 1024; // 50GB
````

---

### Files & Folders

* Use `kebab-case` for all file and folder names
* Examples:

  * `upload-controller.js`
  * `clean-expired-files.js`

---

### Database (Sequelize/PostgreSQL)

#### Tables

* `PascalCase`, plural
* Examples: `Files`, `Downloads`

#### Columns

* `camelCase`, descriptive
* Example: `fileName`, `expiresAt`, `recipientEmail`

#### Models

* `PascalCase`, singular
* Example: `File`, `Download`

#### Relationships

* Use foreign keys with `Id` suffix
* Example: `fileId`

---

## 📄 EJS View Templates

* Located in `src/views`
* Use `kebab-case` filenames: `landing.ejs`, `upload-success.ejs`
* Logic kept minimal; render data passed from controller only

---

## 📜 Git Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard:

### Format:

```
<type>(scope): <short description>
```

### Types:

* `feat`: New feature
* `fix`: Bug fix
* `refactor`: Code restructuring without behavior change
* `style`: Formatting (no code logic)
* `docs`: Documentation only
* `test`: Adding or modifying tests
* `chore`: Tooling/config changes

### Examples:

```
feat(upload): allow setting expiration by time
fix(download): return 403 if file already downloaded
docs(readme): add local setup instructions
```

---

## 🧪 Testing (future plan)

* Test files in `/test`, named like: `upload.test.js`
* Use [Jest](https://jestjs.io/) (coming soon)

---

## 🌐 URL Structure

* `/` – Landing page
* `/upload` – Upload form
* `/d/:token` – Download file by token
* `/disclaimer` – Legal & usage notice

---

## 📦 Environment Variables (`.env`)

Use **UPPER\_SNAKE\_CASE** for all keys:

```env
DB_USERNAME=postgres
DB_PASSWORD=secret
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=ikat_digital
BASE_URL=https://ikat.id
```

---

## 🧼 Cron & Cleanup

* Scheduled jobs placed in `src/jobs`
* Follow file naming: `clean-expired-files.js`
* Cron is configured via `node-cron` inside `app.js` or `jobs/index.js`

---

## 🤝 Contribution Standards

* Follow the [CONTRIBUTING.md](./CONTRIBUTING.md)
* Keep code clean, readable, and DRY (Don't Repeat Yourself)
* Leave helpful comments where necessary
* Make PRs small and focused
* Review others respectfully

---

## ✅ Linting & Formatting (planned)

Coming soon: ESLint + Prettier config for auto formatting and catching issues early.

---

## 🧠 Final Notes

Consistent code is clean code.
Thanks for helping maintain code quality in **Ikat Digital** 💙
