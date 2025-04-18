import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Main from "../../components/main/main";
import Project from "../../components/project/project";
import Footer from "../../components/footer/footer";
import useTokenStore from "../../stores/useTokenStore";
import { validateToken } from "../../api/auth";

function Home() {
  const navigate = useNavigate();
  const token = useTokenStore((state) => state.token);

  useEffect(() => {
    const checkToken = async () => {
      console.log("Token sent for validation:", token);
      if (!token) {
        console.error("No token found");
        navigate("/login");
        return;
      }

      try {
        const data = await validateToken(token);
        console.log("Token is valid:", data.payload);
      } catch (error) {
        console.error("Error validating token:", error);
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate, token]);

  return (
    <header>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md"></div>
      <Main />
      <Project />
      <Footer />
    </header>
  );
}

export default Home;
