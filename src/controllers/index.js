const path = require("path");
const fs = require("fs");
const { File, Download } = require("../db/models");
const { v4: uuidv4 } = require("uuid");
const QRCode = require("qrcode");

exports.showUploadForm = (req, res) => {
  res.render("upload");
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
      password: password && password.trim() !== "" ? password : null,
      expiresAt,
      downloaded: deleteAfterDownload === "yes" ? true : false,
      ip: req.ip,
      ua: req.headers["user-agent"],
      refer: req.headers.referer || "",
      origin: req.headers.origin || "",
      lang: req.headers["accept-language"] || "",
    });

    const downloadUrl = `${
      process.env.BASE_URL || "http://localhost:3000"
    }/d/${token}`;

    const qrCodeOptions = {
      errorCorrectionLevel: "M",
      type: "image/png",
      quality: 0.92,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
      width: 256,
    };

    const qrCodeDataURL = await QRCode.toDataURL(downloadUrl, qrCodeOptions);

    res.render("success", {
      downloadUrl,
      qrCode: qrCodeDataURL,
      fileName: file.originalname,
      fileSize: formatFileSize(file.size),
      expiresAt: expiresAt.toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      deleteAfterDownload: deleteAfterDownload === "yes",
      hasPassword: password && password.trim() !== "",
    });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).render("message", {
      title: "Upload Failed",
      message: "An error occurred while uploading the file.",
    });
  }
};

exports.downloadFile = async (req, res) => {
  const { token } = req.params;
  console.log("Download request for token:", token);

  try {
    const file = await File.findOne({ where: { token } });
    console.log("File found:", file ? "Yes" : "No");

    if (!file) {
      console.log("File not found in database");
      return res.status(404).render("message", {
        title: "File Not Found",
        message:
          "The file you are looking for does not exist or has been deleted.",
      });
    }

    // Debug: Print all file properties
    console.log(
      "Raw file object from database:",
      JSON.stringify(file.toJSON(), null, 2)
    );
    console.log("File password field type:", typeof file.password);
    console.log("File password value:", file.password);
    console.log("File password exists check:", !!file.password);

    // Cek apakah file sudah expired
    if (file.expiresAt && new Date() > new Date(file.expiresAt)) {
      console.log("File expired");
      return res.status(410).render("message", {
        title: "File Expired",
        message: "This file has expired and is no longer available.",
      });
    }

    // Cek apakah file sudah pernah didownload (jika setting delete after download)
    if (file.downloaded) {
      const existing = await Download.findOne({
        where: { fileId: file.id },
      });

      if (existing) {
        console.log("File already downloaded");
        return res.status(403).render("message", {
          title: "File Unavailable",
          message:
            "This file has already been downloaded and is no longer available.",
        });
      }
    }

    // Cek file fisik di disk
    const filePath = path.resolve(__dirname, "../../uploads", file.filename);
    console.log("Checking file path:", filePath);

    if (!fs.existsSync(filePath)) {
      console.log("Physical file not found:", filePath);
      return res.status(404).render("message", {
        title: "File Not Found",
        message: "The requested file no longer exists on the server.",
      });
    }

    // Handle password protection dengan extra safety
    const hasPassword =
      file.password !== null &&
      file.password !== undefined &&
      file.password !== "";
    console.log("Has password check:", hasPassword);

    if (hasPassword) {
      console.log("File is password protected");

      // SAFE ACCESS - Cek req.body dan req.query dengan safety
      const safeBody = req.body || {};
      const safeQuery = req.query || {};
      const providedPassword = safeBody.password || safeQuery.password;

      console.log("Request method:", req.method);
      console.log("Request body exists:", !!req.body);
      console.log("Request query exists:", !!req.query);
      console.log("Provided password:", providedPassword ? "Yes" : "No");

      if (!providedPassword) {
        console.log("No password provided, showing password form");

        // Generate QR Code with error handling
        const downloadUrl = `${
          process.env.BASE_URL || "http://localhost:3000"
        }/d/${token}`;
        let qrCodeDataURL = null;

        try {
          qrCodeDataURL = await QRCode.toDataURL(downloadUrl, {
            errorCorrectionLevel: "M",
            width: 200,
          });
          console.log("QR Code generated successfully");
        } catch (qrError) {
          console.error("QR Code generation error:", qrError);
        }

        const templateData = {
          token: token,
          file: {
            original: file.original || "Unknown File",
            note: file.note || "",
            size: formatFileSize(getFileSize(file.filename)),
          },
          qrCode: qrCodeDataURL,
        };

        console.log(
          "Rendering password template with data:",
          JSON.stringify(templateData, null, 2)
        );

        try {
          return res.render("password", templateData);
        } catch (renderError) {
          console.error("Template render error:", renderError);
          return res.status(500).render("message", {
            title: "Template Error",
            message: "Error rendering password page. Please try again.",
          });
        }
      }

      // Verify password
      if (providedPassword !== file.password) {
        console.log("Incorrect password provided");

        const downloadUrl = `${
          process.env.BASE_URL || "http://localhost:3000"
        }/d/${token}`;
        let qrCodeDataURL = null;

        try {
          qrCodeDataURL = await QRCode.toDataURL(downloadUrl, {
            errorCorrectionLevel: "M",
            width: 200,
          });
        } catch (qrError) {
          console.error("QR Code generation error:", qrError);
        }

        const templateData = {
          token: token,
          file: {
            original: file.original || "Unknown File",
            note: file.note || "",
            size: formatFileSize(getFileSize(file.filename)),
          },
          qrCode: qrCodeDataURL,
          error: "Incorrect password. Please try again.",
        };

        try {
          return res.render("password", templateData);
        } catch (renderError) {
          console.error("Template render error:", renderError);
          return res.status(500).render("message", {
            title: "Template Error",
            message: "Error rendering password page. Please try again.",
          });
        }
      }

      console.log("Password correct");
    }

    // Generate QR Code untuk download page
    const downloadUrl = `${
      process.env.BASE_URL || "http://localhost:3000"
    }/d/${token}`;
    let qrCodeDataURL = null;

    try {
      qrCodeDataURL = await QRCode.toDataURL(downloadUrl, {
        errorCorrectionLevel: "M",
        width: 200,
      });
    } catch (qrError) {
      console.error("QR Code generation error:", qrError);
    }

    // Jika ada parameter ?download=1, langsung download file
    const safeQuery = req.query || {};
    if (safeQuery.download === "1") {
      console.log("Direct download requested");

      try {
        // Record download
        await Download.create({
          id: uuidv4(),
          fileId: file.id,
          ip: req.ip,
          ua: req.headers["user-agent"] || "",
          refer: req.headers.referer || "",
          origin: req.headers.origin || "",
          lang: req.headers["accept-language"] || "",
        });

        console.log("Download recorded, sending file");
        return res.download(filePath, file.original, (err) => {
          if (err) {
            console.error("File download error:", err);
            return res.status(500).render("message", {
              title: "Download Failed",
              message: "An error occurred while downloading the file.",
            });
          }
        });
      } catch (downloadError) {
        console.error("Error recording download:", downloadError);
        return res.status(500).render("message", {
          title: "Download Failed",
          message: "An error occurred while processing your download.",
        });
      }
    }

    // Render halaman download dengan info file
    console.log("Rendering download page");
    const finalDownloadUrl = hasPassword
      ? `${downloadUrl}?download=1&password=${encodeURIComponent(
          file.password
        )}`
      : `${downloadUrl}?download=1`;

    const downloadTemplateData = {
      file: {
        original: file.original || "Unknown File",
        note: file.note || "",
        expiresAt: file.expiresAt
          ? file.expiresAt.toLocaleString("id-ID", {
              timeZone: "Asia/Jakarta",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : null,
        size: formatFileSize(getFileSize(file.filename)),
        hasPassword: hasPassword,
      },
      token: token,
      qrCode: qrCodeDataURL,
      downloadUrl: finalDownloadUrl,
    };

    console.log(
      "Download template data:",
      JSON.stringify(downloadTemplateData, null, 2)
    );

    try {
      return res.render("download", downloadTemplateData);
    } catch (renderError) {
      console.error("Download template render error:", renderError);
      return res.status(500).render("message", {
        title: "Template Error",
        message: "Error rendering download page. Please try again.",
      });
    }
  } catch (err) {
    console.error("Download controller error:", err);
    console.error("Error stack:", err.stack);
    return res.status(500).render("message", {
      title: "Download Failed",
      message: "An error occurred while trying to download the file.",
    });
  }
};

// Helper Functions
function parseExpiresIn(str) {
  const unit = str.slice(-1);
  const num = parseInt(str.slice(0, -1), 10);
  switch (unit) {
    case "m":
      return num * 60 * 1000;
    case "h":
      return num * 60 * 60 * 1000;
    case "d":
      return num * 24 * 60 * 60 * 1000;
    default:
      return 30 * 60 * 1000;
  }
}

function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function getFileSize(filename) {
  try {
    const filePath = path.resolve(__dirname, "../../uploads", filename);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      return stats.size;
    }
    return 0;
  } catch (err) {
    console.error("Error getting file size:", err);
    return 0;
  }
}
