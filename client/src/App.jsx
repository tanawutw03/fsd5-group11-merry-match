import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MerryPackagePage from "./pages/MerryPackagePage";
import { Link } from "react-router-dom";
import Matching from "./pages/Matching";

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
        <Route path="/matching" element={<Matching />} />
        <Route path="/test" element={<HomePage />} />
        <Route path="/" element={<MerryPackagePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
