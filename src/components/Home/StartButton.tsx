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
        } px-6 py-5`}
        disabled={canGoNext}
      >
        {getHasStartedExam() ? "Next >" : "Start"}
      </button>
    </>
  );
}
