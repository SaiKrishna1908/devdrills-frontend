import { useState } from "react";
import "./StartButton.css";

type StartButtonProps = {
  getHasStartedExam: () => boolean,
  setHasStartedExam: (value: boolean) => void
  canGoNext: boolean
  handleNextQuestion: () => void;
};

export default function StartButton({canGoNext, getHasStartedExam, setHasStartedExam, handleNextQuestion}: StartButtonProps) {  
  const [shouldSlideDown, setShouldSlideDown] = useState(false);

  const handleClick = async () => {

    if (getHasStartedExam())  {
      handleNextQuestion();
    } else {
      setHasStartedExam(true);
      setShouldSlideDown(true);    
    }    
  };

  return (
    <>      
      <button
        onClick={handleClick}
        className={`start-button ${
          shouldSlideDown ? "slide-down" : ""
        } px-8 py-6 min-w-[200px]`}
        disabled={canGoNext}
      >
        {getHasStartedExam() ? (
          <span className="flex items-center justify-center gap-2">
            Next
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            Start
          </span>
        )}
      </button>
    </>
  );
}
