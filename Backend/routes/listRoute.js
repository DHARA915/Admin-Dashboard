const express = require('express');
const {
  uploadList,
  getLists,
} = require('../controllers/listController');
const { protect } = require('../middleware/auth');
const upload = require('../utils/fileUpload');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getLists);

router
  .route('/upload')
  .post(upload.single('file'), uploadList);

module.exports = router;