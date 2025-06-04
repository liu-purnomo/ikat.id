const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const controller = require('../controllers');

// Ensure the uploads folder exists
const uploadDir = path.resolve(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 * 1024, // 50GB
  },
});

// Routes
router.get('/', (req, res) => {
  res.render('index');
});
router.get('/upload', controller.showUploadForm);
router.post('/upload', upload.single('file'), controller.uploadFile);
router.get('/d/:token', controller.downloadFile);
router.get('/disclaimer', (req, res) => {
  res.render('disclaimer');
});

module.exports = router;
