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
<<<<<<< HEAD
import { UserProvider, useUser } from "./app/userContext.js";
=======
>>>>>>> 7b9d60f3d41c721025f36dedc8ab735cdf0bfdfd

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
  const { user, avatarUrl } = useUser();
  console.log(`user app`, user);
  console.log(`avatar app`, avatarUrl);

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

  return <HomePage />;
};

function App() {
  return (
<<<<<<< HEAD
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NoMatch />} />
          <Route path="/" element={<NonUserHomePage />} />
          <Route path="/homepage" element={<AuthorizedHomePage />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/createpackage" element={<CreatePackage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/matching" element={<Matching />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/package" element={<MerryPackagePage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
=======
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NoMatch />} />
        <Route path="/" element={<NonUserHomePage />} />
        <Route path="/homepage" element={<AuthorizedHomePage />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/createpackage" element={<CreatePackage />} />
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/matching" element={<Matching />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/package" element={<MerryPackagePage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/test" element={<AdminPackagePageTest />} />
      </Routes>
    </BrowserRouter>
>>>>>>> 99fd8e4 (fix: conflict)
  );
}

export default App;
