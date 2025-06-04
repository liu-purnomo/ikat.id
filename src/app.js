require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public')));

const cron = require('node-cron');
const deleteExpiredFiles = require('./jobs/delete-expired-files');

cron.schedule('*/5 * * * *', async () => {
  // console.log('[Cron] Checking for expired files...');
  await deleteExpiredFiles();
});

// routing
app.use('/', routes);

app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).render('message', {
      title: 'Upload Too Large',
      message: 'The file exceeds the 50GB upload limit.',
    });
  }
  next(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
