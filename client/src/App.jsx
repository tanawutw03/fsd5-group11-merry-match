import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Matching from "./pages/Matching";
import RegisterPage1 from "./pages/RegisterPage1";
import RegisterPage2 from "./pages/RegisterPage2";
import RegisterPage3 from "./pages/RegisterPage3";
import NonUserHomePage from "./pages/NonUserHomePage";
<<<<<<< HEAD
import MerryPackagePage from "./pages/MerryPackagePage";
import LoginPage from "./pages/LoginPage";

const NoMatch = () => {
  return (
    <div className="h-screen text-5xl flex flex-col justify-center items-center gap-5">
      <h1> 404 Not Found</h1>
      <Link to="/" className="text-blue-500">
        back to home
      </Link>
    </div>
  );
};

const AuthorizedHomePage = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));

  if (!token) {
    // If there is no token, user is not authorized
    return (
      <div className="h-screen text-5xl flex flex-col justify-center items-center gap-5">
        <h1>Not Authorized</h1>
        <Link to="/" className="text-blue-500">
          Back to home
        </Link>
      </div>
    );
  }

  // Render the authorized content
  return <HomePage />;
};

function App() {
  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NoMatch />} />
        <Route path="/" element={<NonUserHomePage />} />
        <Route path="/homepage" element={<AuthorizedHomePage />} />
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/matching" element={<Matching />} />
        <Route path="/register1" element={<RegisterPage1 />} />
        <Route path="/register2" element={<RegisterPage2 />} />
        <Route path="/register3" element={<RegisterPage3 />} />
        <Route path="/package" element={<MerryPackagePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
