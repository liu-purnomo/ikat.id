const path = require('path');
const fs = require('fs');
const { File, Download } = require('../db/models');
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');

exports.showUploadForm = (req, res) => {
  res.render('upload');
};

exports.uploadFile = async (req, res) => {
  const file = req.file;
  const { note, recipientEmail, deleteAfterDownload, expiresIn, password } =
    req.body;

  const expiresAt = new Date(Date.now() + parseExpiresIn(expiresIn));
  const token = uuidv4();

  try {
    const newFile = await File.create({
      id: uuidv4(),
      token,
      code: Math.random().toString(36).substring(2, 6).toUpperCase(),
      filename: file.filename,
      original: file.originalname,
      note,
      recipientEmail,
      password: password && password.trim() !== '' ? password : null,
      expiresAt,
      downloaded: deleteAfterDownload === 'yes' ? true : false,
      ip: req.ip,
      ua: req.headers['user-agent'],
      refer: req.headers.referer || '',
      origin: req.headers.origin || '',
      lang: req.headers['accept-language'] || '',
    });

    const downloadUrl = `${
      process.env.BASE_URL || 'http://localhost:3000'
    }/d/${token}`;

    const qrCodeOptions = {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
      width: 256,
    };

    const qrCodeDataURL = await QRCode.toDataURL(downloadUrl, qrCodeOptions);

    res.render('success', {
      downloadUrl,
      qrCode: qrCodeDataURL,
      fileName: file.originalname,
      fileSize: formatFileSize(file.size),
      expiresAt: expiresAt.toLocaleString('id-ID', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      deleteAfterDownload: deleteAfterDownload === 'yes',
      hasPassword: password && password.trim() !== '',
    });
  } catch (err) {
    // console.error("Upload Error:", err);
    res.status(500).render('message', {
      title: 'Upload Failed',
      message: 'An error occurred while uploading the file.',
    });
  }
};

exports.downloadFile = async (req, res) => {
  const { token } = req.params;

  try {
    const file = await File.findOne({ where: { token } });

    if (!file) {
      return res.status(404).render('message', {
        title: 'File Not Found',
        message:
          'The file you are looking for does not exist or has been deleted.',
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

    const filePath = path.resolve(__dirname, '../../uploads', file.filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).render('message', {
        title: 'File Not Found',
        message: 'The requested file no longer exists on the server.',
      });
    }

    const hasPassword =
      file.password !== null &&
      file.password !== undefined &&
      file.password !== '';

    if (hasPassword) {
      const safeBody = req.body || {};
      const safeQuery = req.query || {};
      const providedPassword = safeBody.password || safeQuery.password;

      if (!providedPassword) {
        const downloadUrl = `${
          process.env.BASE_URL || 'http://localhost:3000'
        }/d/${token}`;
        let qrCodeDataURL = null;

        try {
          qrCodeDataURL = await QRCode.toDataURL(downloadUrl, {
            errorCorrectionLevel: 'M',
            width: 200,
          });
        } catch (qrError) {}

        const templateData = {
          token: token,
          file: {
            original: file.original || 'Unknown File',
            note: file.note || '',
            size: formatFileSize(getFileSize(file.filename)),
          },
          qrCode: qrCodeDataURL,
        };

        try {
          return res.render('password', templateData);
        } catch (renderError) {
          return res.status(500).render('message', {
            title: 'Template Error',
            message: 'Error rendering password page. Please try again.',
          });
        }
      }

      // Verify password
      if (providedPassword !== file.password) {
        const downloadUrl = `${
          process.env.BASE_URL || 'http://localhost:3000'
        }/d/${token}`;
        let qrCodeDataURL = null;

        try {
          qrCodeDataURL = await QRCode.toDataURL(downloadUrl, {
            errorCorrectionLevel: 'M',
            width: 200,
          });
        } catch (qrError) {}

        const templateData = {
          token: token,
          file: {
            original: file.original || 'Unknown File',
            note: file.note || '',
            size: formatFileSize(getFileSize(file.filename)),
          },
          qrCode: qrCodeDataURL,
          error: 'Incorrect password. Please try again.',
        };

        try {
          return res.render('password', templateData);
        } catch (renderError) {
          return res.status(500).render('message', {
            title: 'Template Error',
            message: 'Error rendering password page. Please try again.',
          });
        }
      }
    }

    const downloadUrl = `${
      process.env.BASE_URL || 'http://localhost:3000'
    }/d/${token}`;
    let qrCodeDataURL = null;

    try {
      qrCodeDataURL = await QRCode.toDataURL(downloadUrl, {
        errorCorrectionLevel: 'M',
        width: 200,
      });
    } catch (qrError) {}

    const safeQuery = req.query || {};
    if (safeQuery.download === '1') {
      try {
        await Download.create({
          id: uuidv4(),
          fileId: file.id,
          ip: req.ip,
          ua: req.headers['user-agent'] || '',
          refer: req.headers.referer || '',
          origin: req.headers.origin || '',
          lang: req.headers['accept-language'] || '',
        });

        return res.download(filePath, file.original, (err) => {
          if (err) {
            return res.status(500).render('message', {
              title: 'Download Failed',
              message: 'An error occurred while downloading the file.',
            });
          }
        });
      } catch (downloadError) {
        return res.status(500).render('message', {
          title: 'Download Failed',
          message: 'An error occurred while processing your download.',
        });
      }
    }

    const finalDownloadUrl = hasPassword
      ? `${downloadUrl}?download=1&password=${encodeURIComponent(
          file.password
        )}`
      : `${downloadUrl}?download=1`;

    const downloadTemplateData = {
      file: {
        original: file.original || 'Unknown File',
        note: file.note || '',
        expiresAt: file.expiresAt
          ? file.expiresAt.toLocaleString('id-ID', {
              timeZone: 'Asia/Jakarta',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          : null,
        size: formatFileSize(getFileSize(file.filename)),
        hasPassword: hasPassword,
      },
      token: token,
      qrCode: qrCodeDataURL,
      downloadUrl: finalDownloadUrl,
    };

    try {
      return res.render('download', downloadTemplateData);
    } catch (renderError) {
      return res.status(500).render('message', {
        title: 'Template Error',
        message: 'Error rendering download page. Please try again.',
      });
    }
  } catch (err) {
    return res.status(500).render('message', {
      title: 'Download Failed',
      message: 'An error occurred while trying to download the file.',
    });
  }
};

// Helper Functions
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
      return 30 * 60 * 1000;
  }
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getFileSize(filename) {
  try {
    const filePath = path.resolve(__dirname, '../../uploads', filename);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      return stats.size;
    }
    return 0;
  } catch (err) {
    return 0;
  }
}
