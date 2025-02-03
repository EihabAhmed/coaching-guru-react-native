const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateTopicsAIModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Learn Python : :As you are coaching teacher - User want to learn about the topic - Generate 5-7 Course title for study (Short) - Make sure it is related to description - Output will be ARRAY of String in JSON FORMAT only - Do not add any plain text in output,",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '{"course_titles": ["Python Basics: A Gentle Intro", "Python Fundamentals: Data & Control", "Python: Functions and Modularity", "Python Data Structures: Lists & Dictionaries", "Object-Oriented Python (OOP)", "File Handling and Input/Output in Python", "Python: Intro to Libraries and Modules"]}',
        },
      ],
    },
  ],
});

export const GenerateCourseAIModel = model.startChat({
  generationConfig,
  history: [],
});

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());
