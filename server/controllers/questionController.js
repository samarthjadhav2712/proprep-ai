const Question = require("../models/Question");
const Session = require("../models/Session");

// desc  Add additional questions to an existing session
// route  PUT /api/questions/add
// access Private

exports.addQuestionsToSession = async (req, res) => {
    try{
            const { sessionId, questions } = req.body;
            if(!sessionId || !questions || !Array.isArray(questions) || questions.length === 0) {
                return res.status(400).json({ message: "Session ID and questions are required" });
            }

            const session = await Session.findById(sessionId);

            if(!session) {
                return res.status(404).json({ message: "Session not found" });
            }   

            // create new questions
            const createdQuestions = await Question.insertMany(
                questions.map((q) => ({ 
                    session: sessionId,
                    question : q.question,
                    answer: q.answer,
            }))
            );

            // update session with new question IDs
            session.questions.push(...createdQuestions.map((q) => q._id));
            await session.save();

            res.status(200).json({ message: "Questions added to session", questions: createdQuestions });
    }
    catch(error){
        console.error("Error adding questions to session:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// desc  Toggle pin/unpin a question
// route  PUT /api/questions/:id/pin
// access Private

exports.togglePinQuestion = async (req, res) => {
    try{
        const question = await Question.findById(req.params.id);
        if(!question){
            return res.status(404).json({ success : false , message: "Question not found" });
        }

        question.isPinned = !question.isPinned;
        await question.save();

        res.status(200).json({ message: `Question ${question.isPinned ? "pinned" : "unpinned"} successfully`, question });
    }
    catch(error){
        console.error("Error toggling pin status:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// desc  Update note for a question
// route  PUT /api/questions/:id/note
// access Private

exports.updateQuestionNote = async (req, res) => {
    try{
        const {note} = req.body;
        const question = await Question.findById(req.params.id);

        if(!question){
            return res.status(404).json({ success : false , message: "Question not found" });
        }

        question.note = note || "";
        await question.save();

        res.status(200).json({ message: "Question note updated successfully", question });
    }
    catch(error){
        console.error("Error updating question note:", error);
        res.status(500).json({ message: "Server error" });
    }
};