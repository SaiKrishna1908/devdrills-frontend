import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TokenExchange() {
  const [loading, setLoading] = useState(true); // State to manage loading screen
  const navigate = useNavigate();
  const hasFetched = useRef(false); // Ref to track if the API call has already been made

  useEffect(() => {
    const exchangeCodeForToken = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (!code) {
          console.error("No code found in query params");
          navigate("/"); // Redirect to login if no code is found
          return;
        }

        // Make the API call to exchange the code for a JWT
        const response = await axios.get(
          `http://localhost:8080/api/auth/authenticate/${code}`
        );

        // Save the token in localStorage or any other storage mechanism
        localStorage.setItem("token", response.data.token);

        // Redirect to "/home" after successful token exchange
        navigate("/home");
      } catch (error) {
        console.error("Error exchanging code for token:", error);
        navigate("/"); // Redirect to login on error
      } finally {
        setLoading(false); // Stop the loading screen
      }
    };

    if (!hasFetched.current) {
      hasFetched.current = true; // Mark as fetched
      exchangeCodeForToken();
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading && (
        <div className="text-center">
          <div className="loader"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">
            Fetching Brain Rot Questions, Hang on...
          </p>
        </div>
      )}
    </div>
  );
}