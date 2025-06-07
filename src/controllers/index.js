const path = require('path');
const fs = require('fs');
const { File, Download } = require('../db/models');
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');

exports.showUploadForm = (req, res) => {
  res.render('upload'); // form upload
};

exports.uploadFile = async (req, res) => {
  const file = req.file;
  const {
    note,
    recipientEmail,
    deleteAfterDownload,
    expiresIn,
  } = req.body;

  const expiresAt = new Date(Date.now() + parseExpiresIn(expiresIn));
  const token = uuidv4();
  const downloadUrl = `${process.env.BASE_URL}/d/${token}`;

  try {
    const newFile = await File.create({
      id: uuidv4(),
      token,
      code: Math.random().toString(36).substring(2, 6).toUpperCase(),
      filename: file.filename,
      original: file.originalname,
      note,
      recipientEmail,
      expiresAt,
      downloaded: deleteAfterDownload === 'yes' ? true : false,
      ip: req.ip,
      ua: req.headers['user-agent'],
      refer: req.headers.referer || '',
      origin: req.headers.origin || '',
      lang: req.headers['accept-language'] || '',
    });

    // Generate QR code as data URL
    const qrCodeDataURL = await QRCode.toDataURL(downloadUrl);

    res.render('success', {
      downloadUrl,
      qrCodeDataURL,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Upload failed.');
  }
};

exports.downloadFile = async (req, res) => {
  const { token } = req.params;

  try {
    const file = await File.findOne({ where: { token } });

    if (!file) {
      return res.status(404).render('message', {
        title: 'File Not Found',
        message: 'The file you are looking for does not exist.',
      });
    }

    if (file.expiresAt && new Date() > new Date(file.expiresAt)) {
      return res.status(410).render('message', {
        title: 'File Expired',
        message: 'This file has expired and is no longer available.',
      });
    }

    if (file.downloaded) {
      const existing = await Download.findOne({
        where: { fileId: file.id },
      });

      if (existing) {
        return res.status(403).render('message', {
          title: 'File Unavailable',
          message:
            'This file has already been downloaded and is no longer available.',
        });
      }
    }

    await Download.create({
      id: uuidv4(),
      fileId: file.id,
      ip: req.ip,
      ua: req.headers['user-agent'],
    });

    const filePath = path.resolve(__dirname, '../../uploads', file.filename);
    res.download(filePath, file.original);
  } catch (err) {
    console.error(err);
    return res.status(500).render('message', {
      title: 'Download Failed',
      message: 'An error occurred while trying to download the file.',
    });
  }
};

// Helper to parse expiration string like '1h', '30m'
function parseExpiresIn(str) {
  const unit = str.slice(-1);
  const num = parseInt(str.slice(0, -1), 10);
  switch (unit) {
    case 'm':
      return num * 60 * 1000;
    case 'h':
      return num * 60 * 60 * 1000;
    case 'd':
      return num * 24 * 60 * 60 * 1000;
    default:
      return 30 * 60 * 1000; // default 30 minutes
  }
}
