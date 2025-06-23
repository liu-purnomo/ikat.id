# 📁 Ikat Digital

**Ikat Digital** adalah layanan file sharing cepat, aman, dan tanpa login. File akan **terhapus otomatis** setelah satu kali diunduh atau berdasarkan waktu kedaluwarsa yang dipilih (30 menit hingga 30 hari). Gratis, privat, dan 100% open source.

🌐 https://ikat.id

---

## 🚀 Fitur Unggulan

- ✅ Unggah file hingga **50 GB**
- ✅ Tanpa login, tanpa registrasi
- ✅ Opsi penghapusan otomatis setelah **1 kali download**
- ✅ Opsi penghapusan berdasarkan waktu: 30 menit hingga 30 hari
- ✅ Dapat dikunci dengan **password**
- ✅ **Link QR Code** untuk download
- ✅ Metadata logging ringan (IP, user-agent, bahasa, referrer)
- ✅ UI gelap yang bersih (Bootstrap 5)
- ✅ Link dapat disalin & dibagikan langsung
- ✅ SEO-friendly landing page
- ✅ Sepenuhnya open source & transparan

---

## 🖼 Cuplikan Layar

> Halaman unggah:
> ![Upload Page](/public/upload.png)

> Setelah berhasil:
> ![Success Page](/public/success-upload.png)

---

## 🔐 Keamanan & Privasi

Kami percaya **privasi adalah hak**, bukan fitur berbayar. Karena itu, Ikat Digital:

- Tidak menyimpan file secara permanen
- Tidak melakukan pelacakan pengguna atau fingerprinting
- File dihapus otomatis sesuai pengaturan user
- Metadata terbatas disimpan hanya untuk log:
  - IP address
  - User-Agent
  - Referrer dan bahasa

Jika Anda mengaktifkan **password**, file hanya dapat diunduh dengan kata sandi tersebut.

Baca [Disclaimer](https://ikat.id/disclaimer) untuk informasi lengkap.

---

## 🧰 Teknologi

- ⚙️ **Express.js** + **EJS** (server dan templating)
- 📦 **Multer** (file upload)
- 🧮 **Sequelize** + **PostgreSQL** (ORM & database)
- 🕐 **Node-cron** (hapus file otomatis)
- 🧾 **UUID**, **QR Code**, dan logging dasar
- 🎨 **Bootstrap 5** (UI frontend)

---

## ⚙️ Menjalankan Secara Lokal

1. Clone repo ini:

```bash
git clone https://github.com/your-username/ikat-digital.git
cd ikat-digital
```

2. Install dependencies:

```bash
npm install
```

3. Salin dan konfigurasi file `.env`:

```bash
cp .env.example .env
```

4. Buat dan migrasikan database:

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

5. Jalankan aplikasi:

```bash
npm run dev
```

---

## 🧩 Kontribusi

Kami membuka kontribusi untuk siapa pun:

- Perbaikan bug atau pengujian
- Peningkatan UI/UX
- Fitur tambahan (misal: statistik, preview file, dsb)
- Dokumentasi atau terjemahan
- Keamanan & performa

Silakan open issue atau pull request!

---

## 📜 Lisensi

MIT License © 2025 — [Liu Purnomo](https://liupurnomo.com)

---

## 🔗 Kontak & Komunitas

- 🌐 [liupurnomo.com](https://liupurnomo.com)
- 📘 [Facebook](https://facebook.com/leonsps)
- 🐦 [Twitter / X](https://x.com/liupurnomo)
- 📸 [Instagram](https://instagram.com/liupurnomo)
- 💼 [LinkedIn](https://linkedin.com/in/liupurnomo)
- 📺 [YouTube](https://youtube.com/@liupurnomo)
