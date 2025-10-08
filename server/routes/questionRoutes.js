const express = require("express");
const {togglePinQuestion , updateQuestionNote , addQuestionsToSession} = require("../controllers/questionController");
const {protect} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/:id/pin", protect,togglePinQuestion);
router.post("/:id/note", protect,updateQuestionNote);
router.post("/add", protect,addQuestionsToSession);    

module.exports = router;