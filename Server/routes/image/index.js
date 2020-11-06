const express = require("express");
const imageController = require("../../controllers/imageController");
const router = express.Router();

/* url 라우팅 */
router.post("/upload", imageController.uploadImage);

module.exports = router;
