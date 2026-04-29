import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Trophy, RotateCcw, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

const quizQuestions = [
  {
    id: 1,
    question: "What is the minimum age to be eligible to vote in India?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    correctAnswerIndex: 1,
    explanation: "The 61st Constitutional Amendment Act of 1988 reduced the voting age from 21 years to 18 years."
  },
  {
    id: 2,
    question: "What does EVM stand for?",
    options: ["Electronic Voting Machine", "Electoral Voting Method", "Electronic Voter Mechanism", "Election Validation Machine"],
    correctAnswerIndex: 0,
    explanation: "Electronic Voting Machines (EVMs) have been used in all general and state assembly elections in India since 2004."
  },
  {
    id: 3,
    question: "Who is responsible for conducting free and fair elections in India?",
    options: ["Supreme Court", "Prime Minister", "Election Commission of India", "Parliament"],
    correctAnswerIndex: 2,
    explanation: "The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering election processes in India."
  },
  {
    id: 4,
    question: "What is NOTA on the EVM?",
    options: ["Notice of Total Absenteeism", "None of the Above", "National Organization for Tax Awareness", "New Order for Technical Advancement"],
    correctAnswerIndex: 1,
    explanation: "NOTA allows voters to indicate their disapproval of all the candidates in a voting system. It was introduced in India in 2013."
  },
  {
    id: 5,
    question: "How often are the Lok Sabha general elections usually held?",
    options: ["Every 3 years", "Every 4 years", "Every 5 years", "Every 6 years"],
    correctAnswerIndex: 2,
    explanation: "Unless dissolved sooner, the Lok Sabha continues for five years from the date appointed for its first meeting."
  }
];

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleOptionClick = (index) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === currentQuestion.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen pt-12 pb-24 flex flex-col items-center px-4 sm:px-6">
      
      {/* Header Info */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-500/10 mb-4">
          <BrainCircuit className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Civic Knowledge Quiz</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-lg mx-auto">
          Test your understanding of the Indian electoral system and constitutional rules.
        </p>
      </div>

      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass p-6 md:p-10 rounded-3xl shadow-xl"
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
                  <span>Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
                  <span>Score: {score}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-500" 
                    style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6">
                {currentQuestion.question}
              </h2>

              {/* Options */}
              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => {
                  let buttonStyle = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 text-slate-700 dark:text-slate-300";
                  let icon = null;

                  if (isAnswered) {
                    if (index === currentQuestion.correctAnswerIndex) {
                      buttonStyle = "bg-india-green-50 dark:bg-india-green-900/20 border-india-green-500 text-india-green-700 dark:text-india-green-400";
                      icon = <CheckCircle2 className="w-5 h-5 text-india-green-500" />;
                    } else if (index === selectedOption) {
                      buttonStyle = "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400";
                      icon = <XCircle className="w-5 h-5 text-red-500" />;
                    } else {
                      buttonStyle = "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(index)}
                      disabled={isAnswered}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left font-medium ${buttonStyle} cursor-pointer`}
                    >
                      <span>{option}</span>
                      {icon}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              {isAnswered && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 mb-6">
                    <p className="text-sm md:text-base text-blue-800 dark:text-blue-200">
                      <span className="font-bold">Fact: </span>{currentQuestion.explanation}
                    </p>
                  </div>
                  
                  <button 
                    onClick={handleNextQuestion}
                    className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {currentQuestionIndex === quizQuestions.length - 1 ? "See Results" : "Next Question"}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-8 md:p-12 rounded-3xl shadow-xl text-center"
            >
              <div className="inline-flex items-center justify-center p-6 rounded-full bg-yellow-500/10 mb-6 border-4 border-yellow-500/20">
                <Trophy className="w-16 h-16 text-yellow-500" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Quiz Completed!</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                You scored <span className="font-bold text-2xl text-blue-600 dark:text-blue-400">{score}</span> out of {quizQuestions.length}
              </p>
              
              <div className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300 font-medium mb-8">
                  {score === quizQuestions.length 
                    ? "Perfect! You are a true civic champion. 🇮🇳" 
                    : score >= 3 
                      ? "Great job! You know a lot about Indian democracy." 
                      : "Good try! Explore the Timeline and AI Chat to learn more."}
                </p>
                
                <button 
                  onClick={handleRestart}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-saffron-500 via-orange-500 to-red-500 text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-5 h-5" />
                  Play Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
