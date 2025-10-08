const {GoogleGenAI} = require("@google/genai");
const {conceptExplainPrompt , questionsAnswerPrompt} = require("../utils/prompts");

const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_API_KEY});

// @desc Generate interview questions based on a topic
// @route POST /api/ai/generate-questions
// @access Private

const generateInterviewQuestion = async (req, res) => {
    try{
        const {role , experience , topicsToFocus , numberOfQuestions} = req.body;

        if(!role || !experience || !topicsToFocus || !numberOfQuestions){
            return res.status(400).json({message: "Please provide all required fields"});
        }

        const prompt = questionsAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        const response = await ai.models.generateContent({
            model : "gemini-2.0-flash-lite",
            contents : prompt,
        });

        let rawText = response.text;

        // clean it : remove ```json and ``` from start and end
        const cleanedText = rawText
        .replace(/^```json\s*/,"") // remove ```json from start
        .replace(/```$/,"") // remove ``` from end
        .trim(); // remove extra spaces
        
        // now safe to parse 
        const data = JSON.parse(cleanedText);

        res.status(200).json(data);
    }
    catch(error){
        console.error("Error generating interview questions:", error);
        res.status(500).json({message: "Server Error"});
    }
};

// @desc Generate concept explanation
// @route POST /api/ai/generate-explanation
// @access Private
const generateConceptExplanation = async (req, res) => {
    try{
        const {question} = req.body;

        if(!question){
            return res.status(400).json({message: "Please provide the interview question"});
        }

        const prompt = conceptExplainPrompt(question);

         const response = await ai.models.generateContent({
            model : "gemini-2.0-flash-lite",
            contents : prompt,
        });

        let rawText = response.text;

        const cleanedText = rawText
        .replace(/^```json\s*/,"") // remove ```json from start
        .replace(/```$/,"") // remove ``` from end
        .trim(); // remove extra spaces

        // now safe to parse
        const data = JSON.parse(cleanedText);
        res.status(200).json(data);
    }
    catch(error){
        console.error("Error generating concept explanation:", error);
        res.status(500).json({message: "Server Error"});
    }
};

module.exports = {generateInterviewQuestion , generateConceptExplanation};