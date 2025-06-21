import { useEffect, useState } from "react";
import StartButton from "./StartButton";
import Quiz from "../Quiz/Quiz";

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
    <div className="relative flex flex-col w-full h-lvh items-center justify-center">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
      >
        Logout
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
