import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Matching from "./pages/Matching";
import RegisterPage from "./pages/RegisterPage";
import NonUserHomePage from "./pages/NonUserHomePage";
import MerryPackagePage from "./pages/MerryPackagePage";

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
        <Route path="/" element={<HomePage />} />
        <Route path="/nonuser" element={<NonUserHomePage />} />
        <Route path="/matching" element={<Matching />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/package" element={<MerryPackagePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
