const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const controller = require('../controllers');

// Setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 * 1024,
  },
});

// GET / — landing page
router.get('/', (req, res) => {
  res.render('index'); // landing.ejs
});

router.get('/upload', controller.showUploadForm);
router.post('/upload', upload.single('file'), controller.uploadFile);

// GET /d/:token — handle file download
router.get('/d/:token', controller.downloadFile);

router.get('/disclaimer', (req, res) => {
  res.render('disclaimer');
});

module.exports = router;
