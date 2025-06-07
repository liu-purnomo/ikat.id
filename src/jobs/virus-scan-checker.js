// Background job to poll VirusTotal scan results for files
// Requires: axios, VirusTotal API key in process.env.VIRUSTOTAL_API_KEY
// Assumes File model has fields: id, scan_id, scan_status ('scanning', 'available', 'infected')

const axios = require('axios');
const { File } = require('../models');

const VIRUSTOTAL_API_KEY = process.env.VIRUSTOTAL_API_KEY;
const POLL_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

async function checkVirusScanResults() {
  const scanningFiles = await File.findAll({ where: { scan_status: 'scanning' } });
  for (const file of scanningFiles) {
    try {
      const response = await axios.get(`https://www.virustotal.com/api/v3/analyses/${file.scan_id}`,
        { headers: { 'x-apikey': VIRUSTOTAL_API_KEY } });
      const status = response.data.data.attributes.status;
      if (status === 'completed') {
        const malicious = response.data.data.attributes.stats.malicious;
        if (malicious > 0) {
          await file.update({ scan_status: 'infected' });
          // Optionally: delete/quarantine file, notify user
        } else {
          await file.update({ scan_status: 'available' });
        }
      }
    } catch (err) {
      console.error(`Error checking scan for file ${file.id}:`, err.message);
    }
  }
}

setInterval(checkVirusScanResults, POLL_INTERVAL_MS);

// For manual run
if (require.main === module) {
  checkVirusScanResults().then(() => process.exit());
}
