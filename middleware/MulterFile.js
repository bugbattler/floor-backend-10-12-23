// const multer = require('multer');

// const storage = multer.memoryStorage();
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
//   fileFilter: function (req, file, callback) {
//     const allowedFileTypes = ['image/jpeg', 'image/png'];
//     if (allowedFileTypes.includes(file.mimetype)) {
//       callback(null, true);
//     } else {
//       const error = new Error('File type is incorrect');
//       callback(error, false);
//     }
//   },
// });

// module.exports = { upload };
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 100 }, // 100MB file size limit (adjust as needed)
  fileFilter: function (req, file, callback) {
    const allowedFileTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/mpeg', 'video/quicktime'];
    if (allowedFileTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      const error = new Error('File type is incorrect');
      callback(error, false);
    }
  },
  // For handling multiple file uploads
  array: 5, // You can adjust this number as needed to limit the number of files
});

module.exports = { upload };

