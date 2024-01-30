import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Link } from "react-router-dom";
import Matching from "./pages/Matching";
<<<<<<< HEAD
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
=======
import NonUserHomePage from "./pages/NonUserHomePage";

<<<<<<< HEAD
>>>>>>> 08a39e1 (feat:add non user landing page)
=======
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
>>>>>>> 892dcb8 (fix: resolve rebase conflict)
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NoMatch />} />
        <Route path="/nonuser" element={<NonUserHomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/matching" element={<Matching />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
