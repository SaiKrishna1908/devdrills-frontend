export default function Quiz() {
  const question = "What is the capital of France?";
  const options = ["Berlin", "Madrid", "Paris", "Rome"];
  const handleSubmit = () => {
    alert("Answer submitted!");
  };

  return (
    
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full my-10">        
        <p className="text-lg font-medium mb-4 text-gray-700">{question}</p>
        <div className="space-y-4">
          {options.map((option, index) => (
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