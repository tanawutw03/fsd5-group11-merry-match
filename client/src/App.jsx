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
// import CreatePackage from "./AdmAvatar"
import { UserProvider, useUser } from "./app/userContext";

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
  // const token = JSON.parse(sessionStorage.getItem("token"));
  const { user } = useUser();

  if (!user) {
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
  // const { setUser } = useUser() || {};

  // useEffect(() => {
  //   // const storedToken = sessionStorage.getItem("token");
  //   const storedToken = localStorage.getItem(
  //     "sb-fzqregkvknbkbhensxqk-auth-token"
  //   );
  //   // const storedUser = localStorage.getItem("user");

  //   // if (storedToken) {
  //   //   setToken(JSON.parse(storedToken));
  //   // }
  //   if (storedToken) {
  //     // console.log("Stored User:", storedToken);
  //     try {
  //       const userData = JSON.parse(storedToken);
  //       if (userData) {
  //         setUser(userData);
  //       } else {
  //         console.error("User data is undefined:", userData);
  //       }
  //     } catch (error) {
  //       console.error("Error parsing user data:", error);
  //     }
  //   }
  // }, [setUser]);

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NoMatch />} />
          <Route path="/" element={<NonUserHomePage />} />
          <Route path="/homepage" element={<AuthorizedHomePage />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/createpackage" element={<CreatePackage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/matching" element={<Matching />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/package" element={<MerryPackagePage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
