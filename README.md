# 📁 Ikat Digital

**Ikat Digital** is a fast, secure, and login-free file sharing service. Files are automatically deleted either after a single download or after a selected expiration period (from 30 minutes to 30 days). It’s free, private, and open source — built with transparency in mind.

🌐 https://ikat.id

---

## 🚀 Features

- ✅ Upload files up to 50 GB
- ✅ No login or registration required
- ✅ Auto-delete after download or time-based expiry
- ✅ Disk cleanup (metadata is retained for logs)
- ✅ Completely free and ad-free
- ✅ Clean dark UI using Bootstrap 5
- ✅ Copyable shareable links
- ✅ SEO-friendly landing page
- ✅ Fully open source and community transparent

---

## 🖼 Screenshots

> Upload page:
![Upload Page](/public/upload.png)

> Success page with copyable link:
![Success Page](/public/success-upload.png)

---

## 🛡 Security & Transparency

This project is 100% open source and can be audited by anyone. We believe trust begins with transparency.

- No persistent file storage
- No user tracking or profiling
- All files are automatically deleted as scheduled
- Only basic metadata (e.g., IP, user-agent) is stored for minimal logging

See our [Disclaimer](https://ikat.id/disclaimer) for more information.

---

## 🧰 Tech Stack

- **Express.js**
- **EJS**
- **Multer**
- **Sequelize + PostgreSQL**
- **Node-cron**
- **Bootstrap 5**
- **UUID & basic download logging**

---

## ⚙️ Running Locally

1. Clone the repository:

```bash

   git clone https://github.com/your-username/ikat-digital.git
   cd ikat-digital

```


2. Install dependencies:

```bash

   npm install

```

3. Create a `.env` file by copying from `.env.example`:

```env

   cp .env.example .env

```

Adjust the configuration accordingly.

4. Create and migrate the database:

```bash

   npx sequelize-cli db:create
   npx sequelize-cli db:migrate

```

5. Run the app:

```bash

   npm run dev

```

---

## 🧩 Contributions Welcome

We encourage contributions! You can help by:

* Fixing bugs or writing tests
* Improving UI/UX
* Adding new features
* Translating documentation
* Improving security and performance

Please open an issue or submit a pull request.

---

## 📜 License

MIT License © 2025 — [Liu Purnomo](https://liupurnomo.com)

---

## 🔗 Author & Community

* 🌐 [liupurnomo.com](https://liupurnomo.com)
* 📘 [Facebook](https://facebook.com/leonsps)
* 🐦 [Twitter / X](https://x.com/liupurnomo)
* 📸 [Instagram](https://instagram.com/liupurnomo)
* 💼 [LinkedIn](https://linkedin.com/in/liupurnomo)
* 📺 [YouTube](https://youtube.com/@liupurnomo)
