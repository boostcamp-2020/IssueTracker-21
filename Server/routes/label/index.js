const express = require('express');
const router = express.Router();
const labelController = require('../../controllers/labelController')

/* 모든 라벨 가져오기 */
router.get('/', labelController.getLabels);

/* 라벨 추가 */
router.post('/', labelController.insertLabel);

/* 라벨 업데이트 */
router.put('/', labelController.updateLabel);

/* 라벨 삭제 */
router.delete('/', labelController.deleteLabel);

module.exports = router;
