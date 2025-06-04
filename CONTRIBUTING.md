# 🤝 Contributing to Ikat Digital

First off, thank you for taking the time to contribute! 🎉  
We welcome contributions of all kinds — bug reports, feature suggestions, documentation improvements, or actual code contributions.

This project is open source and transparent. Together, we can make file sharing safer and simpler for everyone.

---

## 📦 Repository

GitHub: [https://github.com/liu-purnomo/ikat.id](https://github.com/liu-purnomo/ikat.id)

---

## 🧰 Local Development Setup

1. Fork and clone this repo:
   ```bash
   git clone https://github.com/your-username/ikat.id.git
   cd ikat.id
   ```



2. Install dependencies:

   ```bash
   npm install
    ```

3. Set up the environment:

   - Copy `.env.example` to `.env`
   - Fill in your PostgreSQL database details

4. Set up the database:

   ```bash
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   ```

5. Run the server:

   ```bash
   npm run dev
   ```

---

## 📝 How to Contribute

### ✅ Found a Bug?

- Open an [issue](https://github.com/liu-purnomo/ikat.id/issues)
- Include screenshots, logs, and clear steps to reproduce

### 🌟 Want to Add a Feature?

- First, open a **discussion** or **issue** to describe the idea
- We’ll review and give feedback or suggest enhancements
- Once confirmed, you can submit a PR (Pull Request)

### 📚 Improving Docs?

- Feel free to improve the `README.md`, `CHANGELOG.md`, or add tutorials
- Grammar/spelling fixes are welcome too!

---

## 🔧 Coding Guidelines

- Follow the existing code style (Prettier support coming soon)
- Use consistent `camelCase` and clear naming
- Keep controllers and routes clean and RESTful
- Comment your code if it's non-trivial

---

## 🧪 Testing

Basic manual testing is fine for now:

- Upload a file and verify download works
- Try expired files and observe error handling
- Verify auto-delete jobs run as expected

We welcome contributions that add automated testing!

---

## 📜 License

All contributions will be licensed under the [MIT License](LICENSE).
By contributing, you agree that your code may be distributed under this license.

---

## 🗣 Community

Feel free to follow or reach out via:

- 🌐 [liupurnomo.com](https://liupurnomo.com)
- 📘 [Facebook](https://facebook.com/leonsps)
- 🐦 [Twitter / X](https://x.com/liupurnomo)
- 📸 [Instagram](https://instagram.com/liupurnomo)
- 💼 [LinkedIn](https://linkedin.com/in/liupurnomo)
- 📺 [YouTube](https://youtube.com/@liupurnomo)

Thanks again for your support! 💙
Let’s build Ikat Digital together!
