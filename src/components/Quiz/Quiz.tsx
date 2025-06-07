import { useEffect, useRef, useState } from "react";
import "./Quiz.css";
import axios from "axios";
import { Navigate } from "react-router";

type Question = {
  situation: string;
  expectedAnswer: string;
  notes: string;
  examples: string[];
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  options: string[];
  correctOption: string;
};

type QuizProps = {
  currentQuestionIdx: number;
  setCanGoNext: (value: boolean) => void;
  setCurrentQuestionIdx: (value: number) => void;
};

export default function Quiz({
  currentQuestionIdx,
  setCanGoNext,
  setCurrentQuestionIdx,
}: QuizProps) {
  const [questions, setQuestions] = useState<[Question] | []>([]);
  const hasFetched = useRef(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios
        .get("http://localhost:8080/question", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("Response:", response.data);
          setQuestions(response.data);
        })
        .catch((error) => {
          localStorage.removeItem("token")
          console.log("Error is " + error);
          return <Navigate to='/'></Navigate>          
        });
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true; // Mark as fetched
      fetchData();
    }
  }, []);

  const handleSubmit = () => {
    setCurrentQuestionIdx(currentQuestionIdx + 1);
  };

  const getClassNames = (optionIdx: number) => {
    // console.log("Render Called")
    // console.log("isCurrentOptionCorrect "+ isCurrentOptionCorrect)
    console.log("isCorrectAnswer "+ isCorrectAnswer)
    // console.log("result "+(isCorrectAnswer && !isCurrentOptionCorrect))    
    const disableCss = (isCorrectAnswer) ? ' pointer-events-none opacity-50 ' : ' '
    return  (selectedAnswer !== questions[currentQuestionIdx].correctOption &&
              selectedAnswer === questions[currentQuestionIdx].options[optionIdx] &&
              selectedAnswer !== "")
                ?  `border-red-700 animate-pulse ${disableCss}`
                : selectedAnswer ===
                  questions[currentQuestionIdx].options[optionIdx]
                ? "border-green-600 animate-bounce"
                : "border-gray-300";
  }

  return questions.length === 0 ? (
    <p>Loading...</p>
  ) : (
    <div className="bg-[#ecd3c2] flex space-y-30 space-x-9 shadow-lg rounded-lg p-8 max-w-5xl w-full my-10 quiz-container justify-center">
      <div className="h-fill space-y-7">
        <h1 className="text-2xl font-bold mb-6 text-[#123c69] ">Situation</h1>
        <div className="flex flex-col justify-start ">
          <p className="text-xl font-medium mb-4 text-[#ac3b61]">
            {questions[currentQuestionIdx]["situation"]}
          </p>          
            {selectedAnswer === questions[currentQuestionIdx].correctOption ? (
              <>
                <h2 className="text-2xl font-normal mb-6 text-[#134c70] ">Notes</h2>
                <p className="text-lg, font-normal, text-[#ac4b71]">
                  {questions[currentQuestionIdx].notes}
                </p>
              </>
            ) : (
              <></>
            )}          
        </div>
      </div>
      <div className="space-y-7 w-full">
        {questions[currentQuestionIdx].options.map((option, index) => (
          <div
            key={index}
            
            className={`flex items-center justify-center bg-gray-50 p-4 rounded-lg border  hover:border-[#123c69] hover:shadow-lg hover:scale-105 transition-transform cursor-pointer  ${getClassNames(index)}`}
            onClick={() => {
              setSelectedAnswer(option);

              if (option === questions[index].correctOption) {
                setIsCorrectAnswer((_) => true)
                // setTimeout(() => setCurrentQuestionIdx(currentQuestionIdx+1), 5000)                
              }
              console.log(`Selected: ${option}`);
              console.log(questions[index].correctOption);
            }}
          >
            <span className="text-[#ac3b61] font-medium">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
