export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language"
    ],
    correctAnswer: 0,
    explanation: "HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages."
  },
  {
    id: 2,
    question: "Which CSS property is used to change the text color?",
    options: [
      "text-color",
      "font-color",
      "color",
      "text-style"
    ],
    correctAnswer: 2,
    explanation: "The 'color' property is used to set the text color in CSS."
  },
  {
    id: 3,
    question: "What is the correct syntax for referring to an external JavaScript file?",
    options: [
      "<script href='app.js'>",
      "<script name='app.js'>",
      "<script src='app.js'>",
      "<script file='app.js'>"
    ],
    correctAnswer: 2,
    explanation: "The 'src' attribute is used to specify the path to an external JavaScript file."
  },
  {
    id: 4,
    question: "Which HTML tag is used to define an internal style sheet?",
    options: [
      "<css>",
      "<script>",
      "<style>",
      "<link>"
    ],
    correctAnswer: 2,
    explanation: "The <style> tag is used to define internal CSS within an HTML document."
  },
  {
    id: 5,
    question: "How do you create a function in JavaScript?",
    options: [
      "function = myFunction()",
      "function:myFunction()",
      "function myFunction()",
      "create myFunction()"
    ],
    correctAnswer: 2,
    explanation: "In JavaScript, functions are declared using the 'function' keyword followed by the function name."
  },
  {
    id: 6,
    question: "Which property is used to change the background color in CSS?",
    options: [
      "bgcolor",
      "background-color",
      "color-background",
      "bg-color"
    ],
    correctAnswer: 1,
    explanation: "The 'background-color' property sets the background color of an element."
  },
  {
    id: 7,
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets"
    ],
    correctAnswer: 1,
    explanation: "CSS stands for Cascading Style Sheets, used for styling HTML documents."
  },
  {
    id: 8,
    question: "Which operator is used to assign a value to a variable in JavaScript?",
    options: [
      "x",
      "*",
      "=",
      "-"
    ],
    correctAnswer: 2,
    explanation: "The '=' operator is used for assignment in JavaScript."
  }
];

export const getScoreMessage = (score: number, total: number): string => {
  const percentage = (score / total) * 100;
  
  if (percentage === 100) {
    return "Perfect! You're a quiz master! 🎉";
  } else if (percentage >= 80) {
    return "Excellent work! You really know your stuff! 🌟";
  } else if (percentage >= 60) {
    return "Good job! You're doing great! 👍";
  } else if (percentage >= 40) {
    return "Not bad! Keep learning and improving! 📚";
  } else {
    return "Keep practicing! You'll do better next time! 💪";
  }
};
