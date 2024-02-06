import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Matching from "./pages/Matching";
import RegisterPage from "./pages/RegisterPage";
import NonUserHomePage from "./pages/NonUserHomePage";
import MerryPackagePage from "./pages/MerryPackagePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CreatePackage from "./pages/CreatePackage";
import EditPackage from "./pages/EditPackage";
import { useUser } from "./app/userContext.js";

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
  const { user } = useUser();

  if (!user) {
    // If there is no user session, user is not authorized
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NoMatch />} />
        <Route path="/" element={<NonUserHomePage />} />
        <Route path="/homepage" element={<AuthorizedHomePage />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/createpackage" element={<CreatePackage />} />
        <Route path="/editpackage/:package_id" element={<EditPackage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/matching" element={<Matching />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/package" element={<MerryPackagePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
