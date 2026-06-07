const express = require('express');
const {
  uploadDocument,
  queryKnowledge,
  getDocuments,
  deleteDocument
} = require('../controllers/ragController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/upload', protect, upload.single('document'), uploadDocument);
router.post('/query', protect, queryKnowledge);
router.get('/documents', protect, getDocuments);
router.delete('/documents/:id', protect, deleteDocument);

module.exports = router;
