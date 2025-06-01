import { useEffect, useRef, useState } from 'react';
import './Quiz.css';
import axios from 'axios';

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
      const response = await axios.get('http://localhost:8080/question', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Response:", response.data);
      setQuestions(response.data);
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
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full my-10 quiz-container">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Quiz</h1>
      <p className="text-lg font-medium mb-4 text-gray-700">
        {questions[currentQuestionIdx]['situation']}
      </p>
      <div className="space-y-4">
        {questions[currentQuestionIdx].options.map((option, index) => (
          <label
            key={index}
            className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border hover:bg-gray-100 cursor-pointer"
          >
            <input
              type="radio"
              name="quiz-option"
              value={option}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>      
    </div>
  );
}