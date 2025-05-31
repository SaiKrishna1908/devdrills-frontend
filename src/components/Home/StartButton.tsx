import { useState } from "react";
import "./StartButton.css"; // Import the CSS file
import axios from "axios";

type StartButtonProps = {
  hasStartedExam: boolean,
  setHasStartedExam: (value: boolean) => void
};

export default function StartButton({hasStartedExam, setHasStartedExam}: StartButtonProps) {
  // const [isClicked, setIsClicked] = useState(false);
  const [shouldSlideDown, setShouldSlideDown] = useState(false);

  const getJwtFromToken = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    axios
      .get(`http://localhost:8080/api/auth/authenticate/${code}`) // Data to send
      .then((response) => {
        console.log("Response:", response.data);
        localStorage.setItem("token", response.data.token);
        setHasStartedExam(true);
        setShouldSlideDown(true);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleClick = async () => {
    const token = localStorage.getItem("token");

    if (token == null) {
      await getJwtFromToken();
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
      >
        {hasStartedExam ? "Answer" : "Start"}
      </button>
    </>
  );
}
