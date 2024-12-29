import React, { useState } from "react";
import "./QuizChallenge.css";

const PetCareQuiz = ({ updateLeaderboard }) => {
  const questions = [
    {
      question: "What is the healthiest treat for dogs?",
      options: ["Chocolate", "Carrots", "Grapes", "Cookies"],
      answer: "Carrots",
    },
    {
      question: "How often should a cat's litter box be cleaned?",
      options: ["Once a week", "Every day", "Once a month", "Never"],
      answer: "Every day",
    },
    {
      question: "What is the most eco-friendly pet accessory?",
      options: ["Plastic bowl", "Bamboo leash", "Leather collar", "Steel cage"],
      answer: "Bamboo leash",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleAnswerClick = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 10); // 10 points per correct answer
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCompleted(true);
      updateLeaderboard(score + (selectedOption === currentQuestion.answer ? 10 : 0));
    }
  };

  return (
    <div className="PetCareQuiz">
      {!completed ? (
        <div className="QuestionContainer">
          <h3>Pet Care Quiz</h3>
          <p>{questions[currentQuestionIndex].question}</p>
          <div className="Options">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerClick(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="QuizResult">
          <h3>Quiz Completed!</h3>
          <p>Your Score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default PetCareQuiz;
