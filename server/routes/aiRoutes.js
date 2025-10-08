const express = require("express");
const { generateInterviewQuestion, generateConceptExplanation } = require("../controllers/aiController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/generate-questions", protect, generateInterviewQuestion);
router.post("/generate-explanation", protect, generateConceptExplanation);

module.exports = router;