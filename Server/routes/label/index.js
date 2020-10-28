const express = require('express');
const router = express.Router();
const labelController = require('../controllers/labelController')

router.get('/', labelController.getLabels);
router.post('/', labelController.insertLabel);
router.put('/', labelController.updateLabel);
router.delete('/', labelController.deleteLabel);

module.export = router;
