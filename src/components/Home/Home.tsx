import { useEffect, useState } from "react";
import StartButton from "./StartButton";
import Quiz from "../Quiz/Quiz";

export default function Home() {

  const [hasStartedExam, setHasStartedExam] = useState(false);

  console.log(localStorage.getItem('token'))

  const getHasStartedExam = () => {
    return hasStartedExam;
  }

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
       {hasStartedExam ? <Quiz></Quiz>: <></>}
      <StartButton getHasStartedExam={getHasStartedExam} setHasStartedExam={setHasStartedExam}></StartButton>
    </div>
  );
}
