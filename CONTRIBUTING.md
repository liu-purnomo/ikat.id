# 🤝 Contributing to Ikat Digital

Thank you for taking the time to contribute! 🎉  
We welcome all kinds of contributions — bug reports, feature suggestions, documentation, and code improvements.

This is a community-driven open source project. Let’s make secure file sharing better for everyone.

---

## 📦 Repository

GitHub: [https://github.com/liu-purnomo/ikat.id](https://github.com/liu-purnomo/ikat.id)

---

## 🧰 Local Development Setup

1. Fork and clone the repository:

```bash
git clone https://github.com/your-username/ikat.id.git
cd ikat.id
```

2. Install dependencies:

```bash
npm install
```

3. Setup environment variables:

```bash
cp .env.example .env
```

4. Configure `.env` file with your PostgreSQL and app settings.

5. Set up the database:

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

6. Run the app:

```bash
npm run dev
```

App should run at [http://localhost:3000](http://localhost:3000)

---

## 📝 Contribution Guidelines

### 🐛 Bug Reports

- Use the [Bug Report Template](../../issues/new?template=bug_report.md)
- Include steps to reproduce and screenshots if possible

### 💡 Feature Requests

- Use the [Feature Request Template](../../issues/new?template=feature_request.md)
- Describe the use case clearly

### 🧪 Pull Requests

- Use the [PR Template](../../pulls)
- Keep changes focused and minimal
- Test your changes manually

### 📚 Documentation

- Fix typos or grammar
- Improve setup instructions or add new sections

---

## 💼 Code Style & Conventions

- Follow [CONVENTION.md](./CONVENTION.md)
- Use `camelCase` for variables, `PascalCase` for models
- Commit using Conventional Commits

---

## 🧪 Testing (Manual for now)

- Upload and download a file
- Try expired links
- Test password-protected links
- Test auto-delete functionality

---

## 🔐 Security Issues

Please report vulnerabilities privately to:

📧 **[hi@liupurnomo.com](mailto:hi@liupurnomo.com)**

Do **not** open public issues for security concerns.
See [`SECURITY.md`](./SECURITY.md) for more.

---

## 🧭 Code of Conduct

All contributors must follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

Be kind, respectful, and constructive 🙌

---

## 📜 License

By contributing, you agree your code is licensed under the [MIT License](./LICENSE)

---

## 🗣 Contact & Community

- 🌐 [liupurnomo.com](https://liupurnomo.com)
- 📘 [Facebook](https://facebook.com/leonsps)
- 🐦 [Twitter / X](https://x.com/liupurnomo)
- 📸 [Instagram](https://instagram.com/liupurnomo)
- 💼 [LinkedIn](https://linkedin.com/in/liupurnomo)
- 📺 [YouTube](https://youtube.com/@liupurnomo)

Thanks for your support! 💙

Let’s build **Ikat Digital** together!
