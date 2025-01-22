import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Main from "../components/main/main";
import Project from "../components/project/project";
import Footer from "../components/footer/footer";
import Navbar from "../components/Navbar_logon/navbar";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("access_token");
      console.log("Token sent for validation:", token);
      if (!token) {
        console.error("No token found");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/api/validate-token/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Token is valid:", data.payload);
        } else {
          console.error("Invalid token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error validating token:", error);
        navigate("/login");
      }
    };
    validateToken();
  }, [navigate]);

  return (
    <header>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Navbar />
      </div>
      <Main />
      <Project />
      <Footer />
    </header>
  );
}

export default Home;
