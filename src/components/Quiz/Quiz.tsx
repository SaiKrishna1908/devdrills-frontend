import { useEffect, useRef, useState } from "react";
import "./Quiz.css";
import axios from "axios";

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
};

export default function Quiz() {
  const [questions, setQuestions] = useState<[Question] | []>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const hasFetched = useRef(false); // Ref to track if the API call has already been made

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
          console.log("Error is " + error);
          console.log(error.response.status);
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
    setCurrentQuestionIdx((prevIndex) => prevIndex + 1);
  };

  return questions.length === 0 ? (
    <p>Loading...</p>
  ) : (
    <div className="bg-[#ecd3c2] flex space-y-30 space-x-9 shadow-lg rounded-lg p-8 max-w-5xl w-full my-10 quiz-container justify-center">
      <div>
        <h1 className="text-2xl font-bold mb-6 text-[#123c69] ">Situation</h1>
        <p className="text-lg font-medium mb-4 text-[#ac3b61]">
          {questions[currentQuestionIdx]["situation"]}
        </p>
      </div>
      <div className="space-y-7 w-full">
      {questions[currentQuestionIdx].options.map((option, index) => (
        <div
          key={index}
          className="flex items-center justify-center bg-gray-50 p-4 rounded-lg border border-gray-300 hover:border-[#123c69] hover:shadow-lg hover:scale-105 transition-transform cursor-pointer"
          onClick={() => console.log(`Selected: ${option}`)} // Handle option selection
        >
          <span className="text-[#ac3b61] font-medium">{option}</span>
        </div>
      ))}
    </div>
    </div>
  );
}
