import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/api", function (req, res, next) {
	res.json({ success: true });
});

module.exports = router;
