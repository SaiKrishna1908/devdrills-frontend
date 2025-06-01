import { useState, useEffect } from "react";
import "./StartButton.css"; // Import the CSS file
import axios from "axios";

type StartButtonProps = {
  getHasStartedExam: () => boolean,
  setHasStartedExam: (value: boolean) => void
};

export default function StartButton({getHasStartedExam, setHasStartedExam}: StartButtonProps) {  
  const [shouldSlideDown, setShouldSlideDown] = useState(false);
  
  // const getJwtFromToken = async () => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const code = urlParams.get("code");
  //   await axios
  //     .get(`http://localhost:8080/api/auth/authenticate/${code}`) // Data to send
  //     .then((response) => {
  //       console.log("Response:", response.data);
  //       localStorage.setItem("token", response.data.token);
  //       setHasStartedExam(true);
  //       setShouldSlideDown(true);
  //     })
  //     .catch((error) => console.error("Error:", error));
  // };

  const handleClick = async () => {
    const token = localStorage.getItem("token");

    setHasStartedExam(true);
      setShouldSlideDown(true);

    // if (token == null) {
    //   await getJwtFromToken();
    // } else {
    //   setHasStartedExam(true);
    //   setShouldSlideDown(true);
    // }
  };

  return (
    <>      
      <button
        onClick={handleClick}
        className={`start-button ${
          shouldSlideDown ? "slide-down" : ""
        } px-6 py-5`}
      >
        {getHasStartedExam() ? "Answer" : "Start"}
      </button>
    </>
  );
}
