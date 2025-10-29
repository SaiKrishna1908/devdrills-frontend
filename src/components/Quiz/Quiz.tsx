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
  isCorrectAnswer: boolean;
  setIsCorrectAnswer: (value: boolean) => void;
  streak: number;
  setStreak: (value: number | ((prev: number) => number)) => void;
};

export default function Quiz({
  currentQuestionIdx,
  isCorrectAnswer,
  setIsCorrectAnswer,
  streak,
  setStreak,
}: QuizProps) {
  const [questions, setQuestions] = useState<[Question] | []>([]);
  const hasFetched = useRef(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const URL = import.meta.env.VITE_API_URL
      await axios
        .get(`${URL}/question`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("Response:", response.data);
          setQuestions(response.data);
        })
        .catch((error) => {
          localStorage.removeItem("token");
          console.log("Error is " + error);
          <Navigate to="/"></Navigate>;
        });
    } catch (error) {
      localStorage.removeItem("token");
      console.log("Error is " + error);
      <Navigate to="/"></Navigate>;
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchData();
    }
  }, []);

  const getClassNames = (optionIdx: number) => {
    const disableCss = isCorrectAnswer
      ? " pointer-events-none opacity-50 "
      : " ";
    return selectedAnswer !== questions[currentQuestionIdx].correctOption &&
      selectedAnswer === questions[currentQuestionIdx].options[optionIdx] &&
      selectedAnswer !== ""
      ? `border-red-700 animate-pulse ${disableCss}`
      : selectedAnswer === questions[currentQuestionIdx].options[optionIdx]
      ? "border-green-600 animate-bounce"
      : "border-gray-300";
  };

  console.log(`is correctAnswer: ${isCorrectAnswer}`);

  return questions.length === 0 ? (
    <div className="skeleton-container max-w-5xl w-full">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-paragraph"></div>
      <div className="skeleton skeleton-paragraph"></div>
      <div className="skeleton skeleton-option"></div>
      <div className="skeleton skeleton-option"></div>
      <div className="skeleton skeleton-option"></div>
      <div className="skeleton skeleton-option"></div>
    </div>
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
              <h2 className="text-2xl font-normal mb-6 text-[#134c70] ">
                Correct
              </h2>
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
            className={`flex items-center justify-center bg-gray-50 p-4 rounded-lg border  hover:border-[#123c69] hover:shadow-lg hover:scale-105 transition-transform cursor-pointer  ${getClassNames(
              index
            )} ${isCorrectAnswer ? " pointer-events-none " : ""}`}
            onClick={() => {
              setSelectedAnswer(option);

              if (
                option === questions[currentQuestionIdx].correctOption ||
                option === questions[currentQuestionIdx].expectedAnswer
              ) {
                setIsCorrectAnswer(true);
                // Increment streak on correct answer
                setStreak((prev) => prev + 1);
              } else {
                // Reset streak on wrong answer
                setStreak(0);
              }

              console.log(`Selected: ${option}`);
              console.log(questions[currentQuestionIdx].correctOption);
            }}
          >
            <span className="text-[#ac3b61] font-medium">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
