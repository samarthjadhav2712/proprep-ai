const questionsAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (`
    You are an AI trained to generate technical interview questions & answers for job candidates.

    Task : 
    - Role : ${role}
    - Candidate Experience Level : ${experience} years
    - Topics to Focus On : ${topicsToFocus}
    - Write ${numberOfQuestions} interview questions . 
    - for each question , generate a small 1-2 lines beginner-friendly answer.
    - If the answer needs a code example , add a small code block inside . 
    - Keep formatting very clean.
    - Return a pure JSON array like : 
    [
        {
            "question" : "Question here ?",
            "answer" : "Answer here ."
        },
        ...
    ]
    Important : Do NOT add any extra text . Only return valid JSON . 
`);


const conceptExplainPrompt = (question) =>(`
    You are an AI trained to explain complex technical concepts in a simple and easy-to-understand manner.
    
    Task :
    - Explain the following interview question and its concept in depth as if you're teaching a beginner developer . 
    - Question : ${question}
    - After the explanation , provide a short and clear title that summarizes the concept for the article or page header . 
    - If the explanation includes a code example , add a small code block inside .
    - Keep formatting very clean and clear . 
    - Return the result as a valid JSON object in the following format : 
    {
        "title" : "Short title here ?" ,
        "explanation" : "Detailed explanation here ."
    }
    
    Important :  Do NOT add any extra text outside the JSON format . Only return valid JSON .
`);

module.exports = {questionsAnswerPrompt , conceptExplainPrompt};