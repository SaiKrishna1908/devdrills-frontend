import { useState } from "react";
import StartButton from "./StartButton";
import Quiz from "../Quiz/Quiz";

export default function Home() {

  const [hasStartedExam, setHasStartedExam] = useState(false);

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">      
      <StartButton hasStartedExam={hasStartedExam} setHasStartedExam={setHasStartedExam}></StartButton>
    </div>
  );
}
