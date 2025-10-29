import { useState } from "react";
import StartButton from "./StartButton";
import Quiz from "../Quiz/Quiz";
import "./Home.css";

export default function Home() {
  const [hasStartedExam, setHasStartedExam] = useState(false);
  const [canGoNext, setCanGoNext] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [page, setPage] = useState(0);
  console.log(localStorage.getItem("token"));

  const getHasStartedExam = () => {
    return hasStartedExam;
  };

  const handleNextQuestion = () => {    
    if (currentQuestionIdx == 4) {
      setPage((prev) => prev+1);
      setCurrentQuestionIdx(0)
      setIsCorrectAnswer((_) => false);
      return      
    }
    setCurrentQuestionIdx((prev) => prev + 1);    
    setIsCorrectAnswer((_) => false);
  };

  const handleLogout = () => {
    // Clear token from localStorage or any other storage
    localStorage.removeItem("token");
    // Redirect to login or root page
    window.location.href = "/";
  };

  return (
    <div className="relative flex flex-col w-full min-h-screen bg-[#ede1da] items-center justify-center">
      <button
        onClick={handleLogout}
        className="logout-button fixed top-4 right-4 px-5 py-2.5"
      >
        <span className="flex items-center gap-2">
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
            />
          </svg>
          Logout
        </span>
      </button>
      {hasStartedExam ? (
        <Quiz
          key={page}
          currentQuestionIdx={currentQuestionIdx}
          setCanGoNext={setCanGoNext}
          isCorrectAnswer={isCorrectAnswer}
          setIsCorrectAnswer={setIsCorrectAnswer}          
        ></Quiz>
      ) : (
        <></>
      )}
      <StartButton
        canGoNext={canGoNext}
        getHasStartedExam={getHasStartedExam}
        setHasStartedExam={setHasStartedExam}
        handleNextQuestion={handleNextQuestion}
      ></StartButton>
    </div>
  );
}
