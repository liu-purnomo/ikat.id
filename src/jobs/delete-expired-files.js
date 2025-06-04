const fs = require('fs');
const path = require('path');
const { File } = require('../db/models');
const { Op } = require('sequelize');

async function deleteExpiredFiles() {
  const now = new Date();

  const expiredFiles = await File.findAll({
    where: {
      expiresAt: {
        [Op.lt]: now,
      },
    },
  });

  for (const file of expiredFiles) {
    const filePath = path.resolve(__dirname, '../../uploads', file.filename);

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        //   console.log(`🗑 Deleted expired file: ${file.filename}`);
        // } else {
        //   console.log(`⚠ File not found: ${file.filename}`);
      }
    } catch (err) {
      console.error(`❌ Failed to delete ${file.filename}:`, err.message);
    }
  }
}

module.exports = deleteExpiredFiles;
